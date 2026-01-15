# 使用官方 Node.js 镜像作为基础镜像（完整版，包含 ONNX Runtime 所需的系统库）
FROM node:20 AS base

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖阶段
FROM base AS deps
RUN echo "🏗️  [STAGE 1/3] 开始安装依赖阶段..." && \
    echo "✅ 系统依赖准备完成 (Debian slim)"

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

# 确保 public 目录存在（即使项目中没有）
RUN mkdir -p public

RUN echo "📊 项目文件统计:" && \
    echo "  总文件数: $(find . -type f | wc -l)" && \
    echo "  源代码文件: $(find ./app -name "*.ts" -o -name "*.tsx" | wc -l 2>/dev/null || echo 0)"

# 禁用 telemetry
ENV NEXT_TELEMETRY_DISABLED=1

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

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建 nextjs 用户
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 自动利用输出跟踪来减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 复制国际化相关文件（修复404问题）
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

# 安装 native 模块（standalone 模式不会复制 .so 文件）
RUN pnpm add onnxruntime-node @xenova/transformers --ignore-workspace

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 健康检查（使用 Node.js 内置 fetch，无需安装 curl）
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# 启动应用
CMD ["node", "server.js"]
