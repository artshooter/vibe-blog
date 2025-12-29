# 使用官方 Node.js 镜像作为基础镜像
FROM node:20-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖阶段
FROM base AS deps
# 检查 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN echo "🏗️  [STAGE 1/3] 开始安装依赖阶段..." && \
    apk add --no-cache libc6-compat && \
    echo "✅ 系统依赖安装完成"

WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
RUN echo "📋 复制 package 文件..."
COPY package.json pnpm-lock.yaml ./

RUN echo "📦 开始安装 Node.js 依赖..." && \
    echo "当前目录内容:" && ls -la && \
    pnpm install --frozen-lockfile --prod && \
    echo "✅ 依赖安装完成！安装的包数量: $(pnpm list --depth=0 2>/dev/null | wc -l)"

# 构建阶段
FROM base AS builder
RUN echo "🏗️  [STAGE 2/3] 开始构建阶段..."

WORKDIR /app

# 重新安装完整依赖（包括 devDependencies）用于构建
COPY package.json pnpm-lock.yaml ./
RUN echo "📦 安装构建所需的完整依赖..." && \
    pnpm install --frozen-lockfile && \
    echo "✅ 构建依赖安装完成"

RUN echo "📁 复制源代码..." && \
    echo "当前工作目录: $(pwd)"
COPY . .

RUN echo "📊 项目文件统计:" && \
    echo "  总文件数: $(find . -type f | wc -l)" && \
    echo "  源代码文件: $(find ./app -name "*.ts" -o -name "*.tsx" | wc -l 2>/dev/null || echo 0)"

# 禁用 telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# 构建应用
RUN echo "🔨 开始构建 Next.js 应用..." && \
    echo "Node.js 版本: $(node --version)" && \
    echo "pnpm 版本: $(pnpm --version)" && \
    pnpm run build && \
    echo "✅ 构建完成！" && \
    echo "📊 构建结果统计:" && \
    echo "  .next 目录大小: $(du -sh .next 2>/dev/null || echo '未知')" && \
    echo "  静态文件数量: $(find .next/static -type f | wc -l 2>/dev/null || echo 0)"

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 创建 nextjs 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public

# 自动利用输出跟踪来减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 复制国际化相关文件（修复404问题）
COPY --from=builder /app/messages ./messages

# 确保静态资源在正确位置（修复静态资源404问题）
RUN echo "🔧 确保静态资源和国际化文件正确放置..." && \
    mkdir -p ./.next/static && \
    if [ -d "./.next/static" ] && [ ! -d "./.next/standalone/.next/static" ]; then \
        cp -r ./.next/static ./.next/standalone/.next/ || true; \
    fi && \
    echo "✅ 所有文件检查完成"

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 启动应用
CMD ["node", "server.js"]
