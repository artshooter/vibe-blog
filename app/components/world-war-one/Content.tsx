'use client'

import { motion } from 'framer-motion'
import Hero from './Hero'
import Timeline from './Timeline'
import WarStages from './WarStages'
import DataVisualization from './DataVisualization'

export default function Content() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black text-white">
      {/* Hero */}
      <Hero />

      {/* 引言 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl md:text-2xl text-gray-400 leading-relaxed border-l-4 border-[#8b2020] pl-6 italic">
            第一次世界大战是 1914年至1918年 之间发生的全球军事冲突。
            <br />
            以1914年6月发生的 萨拉热窝事件 作为标志性起点，
            <br />
            以1918年11月 德意志帝国 签署停战协议作为结束。
          </blockquote>
        </motion.div>
      </section>

      {/* 数据可视化 */}
      <DataVisualization />

      {/* 分隔线 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* 战争的发生 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          战争的发生
        </motion.h2>

        <ContentBlock
          title="战争是如何爆发的"
          content={
            <>
              <p className="mb-4 leading-relaxed">
                十九世纪以来斯拉夫民族普遍处于德国、奥匈、奥斯曼帝国的压迫之下。
                随着民族主义在欧洲的蔓延，南斯拉夫人对共同身份的渴望日益增强，民族意识逐步觉醒。
              </p>
              <p className="mb-4 leading-relaxed">
                以南斯拉夫民族为主体的塞尔维亚，作为少数实现独立的斯拉夫国家，开始积极参与南欧的斯拉夫运动。
                在波黑，青年波斯尼亚党等组织在反奥情绪与塞尔维亚支持下迅速激进，民族矛盾不断加深。
              </p>
              <p className="leading-relaxed">
                最终，极端民族主义走向暴力，以萨拉热窝的刺杀事件引爆政治危机。
              </p>
            </>
          }
        />

        <SubSection
          title="萨拉热窝事件"
          items={[
            {
              date: '1914年6月28日',
              text: '奥匈帝国皇储斐迪南大公，在萨拉热窝被青年波斯尼亚党的成员刺杀身亡',
            },
            {
              date: '7月5日',
              text: '德国向奥匈帝国明确表示支持，无论奥匈帝国做出什么动作，德国都将无条件支持',
              note: '1871年完成统一的德意志帝国，面临"东有沙俄，西有法国"的地缘政治压力。为避免两线作战，德国确定了"联合奥匈，抵抗法俄"的方针。在斐迪南遇刺之后，德国为维护同盟体系和遏制斯拉夫主义，向奥匈发出"空白支票"。',
            },
            {
              date: '7月23日',
              text: '奥匈帝国向塞尔维亚发出"最后通牒"，包含十项条件',
              note: '通牒中的个别条件尤为苛刻，如：要求塞尔维亚允许奥匈帝国的官员进入境内调查刺杀事件。',
            },
            {
              date: '7月28日',
              text: '奥匈帝国对塞尔维亚宣战。局部冲突正式开始',
            },
          ]}
        />
      </section>

      {/* 连锁反应时间线 */}
      <Timeline />

      {/* 战争是如何失控的 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <ContentBlock
          title="战争是如何失控的"
          subtitle="如何从局部战争变成全球战争"
          content={
            <div className="space-y-6">
              <EscalationPoint
                title="7月29-30日：俄国全面动员（连锁反应开始）"
                description="面对奥匈对塞尔维亚的宣战，沙俄率先进行战争动员。作为最强大的斯拉夫民族国家，沙俄一直自诩为斯拉夫人的保护者。若放任奥匈帝国对塞尔维亚的进攻，将动摇沙俄在巴尔干的影响力。"
              />
              <EscalationPoint
                title="8月1日：德国对俄国宣战"
                description="在1914年的战争文化中，谁先出击谁就占据了战略上风。为了先发制人，德国在沙俄战争动员后，就立即对沙俄宣战。德国决定执行'施里芬计划'，先攻法国、后战俄国。"
              />
              <EscalationPoint
                title="8月3日：入侵比利时"
                description="德国对法国宣战，并由于比利时不同意德国借道入侵法国，德国入侵比利时。为了避开法国东部的严密防守，德国打算借道比利时，从法国东北部进攻。"
              />
              <EscalationPoint
                title="8月4日：英国对德国宣战"
                description="在1839年签订的伦敦条约中，欧洲列强约定比利时为永久中立国。德国入侵比利时不仅违反了伦敦条约，并且直接威胁到了英伦三岛的安全。于是为了遏制德国称霸欧洲，英国随即对德国宣战。"
              />
            </div>
          }
        />
      </section>

      {/* 分隔线 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* 战争的进程 */}
      <section className="py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          战争的进程
        </motion.h2>

        <WarStages />

        {/* 详细阶段描述 */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-16 space-y-8">
          <StageDetail
            year="1917"
            title="变局详解"
            points={[
              {
                subtitle: '沙俄退出协约国',
                content:
                  '第一次世界大战给沙俄的国内形势造成了巨大的打击。长期战争使国家经济濒临崩溃。1917年2月圣彼得堡爆发了大规模的工人和农民革命运动，俄皇宣布退位。1918年3月，苏维埃正式和德国达成协约，宣布退出第一次世界大战。',
              },
              {
                subtitle: '美国参战',
                content:
                  '美国在一战初期奉行中立主义。随着战争发展，德国实行无限制潜艇战，导致了美国人员和财产的损失。齐默尔曼电报的披露，美国人发现德国在密谋协助墨西哥收回失地。1917年4月6日美国对德国宣战。',
              },
            ]}
          />
        </div>
      </section>

      {/* 分隔线 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* 战争的影响 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          战争的影响
        </motion.h2>

        <div className="space-y-8">
          <ImpactCard
            title="政治格局"
            content="一战导致了德意志、奥匈帝国、奥斯曼帝国、沙俄的彻底瓦解。战胜国在巴黎和会（1919年）上确立了战后国际秩序，形成凡尔赛体系。核心是惩罚德国的《凡尔赛条约》，以及通过国际联盟来维护和平。"
          />

          <ImpactCard
            title="经济"
            content="欧洲各主要参战国在战争中耗尽了大量人力、物力、财力，背负了巨额战争债务。许多工业区和农业区遭到破坏，生产力严重下降。与此同时，美国经济实现了空前繁荣，日本成为亚洲唯一的帝国主义强国。"
          />

          <ImpactCard
            title="社会文化"
            points={[
              {
                subtitle: '战争创伤',
                content:
                  '战争造成了数千万人的死亡和伤残。这种规模的牺牲是前所未有的，也让人们对战争的"荣耀"和"英雄主义"产生了巨大的幻灭。',
              },
              {
                subtitle: '女性地位提升',
                content:
                  '战争导致大量男性伤亡，工厂和农场急需劳动力，使得女性大规模进入传统上由男性主导的领域。这改变了社会对女性角色的认知，并在战后推动了女性获得选举权等政治权利的进程。',
              },
            ]}
          />
        </div>
      </section>

      {/* 尾声 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center">
        <motion.div
          className="border-t-2 border-[#8b2020] pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-400 italic">
            "这是一场终结所有战争的战争"
          </p>
          <p className="text-sm text-gray-600 mt-4">
            —— 然而，历史告诉我们，这只是一个开始
          </p>
        </motion.div>
      </section>
    </div>
  )
}

// 辅助组件

function ContentBlock({
  title,
  subtitle,
  content,
}: {
  title: string
  subtitle?: string
  content: React.ReactNode
}) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-[#d4c5a9] mb-2">
        {title}
      </h3>
      {subtitle && <p className="text-gray-500 italic mb-4">{subtitle}</p>}
      <div className="text-gray-400">{content}</div>
    </motion.div>
  )
}

function SubSection({
  title,
  items,
}: {
  title: string
  items: Array<{ date: string; text: string; note?: string }>
}) {
  return (
    <motion.div
      className="ml-0 md:ml-8 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h4 className="text-xl font-bold text-[#d4c5a9] mb-4">{title}</h4>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-l-2 border-gray-700 pl-4">
            <div className="text-[#8b2020] font-mono text-sm mb-1">
              {item.date}
            </div>
            <p className="text-gray-400 mb-2">{item.text}</p>
            {item.note && (
              <p className="text-sm text-gray-600 italic pl-4 border-l border-gray-800">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function EscalationPoint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <motion.div
      className="bg-[#2a2a2a]/50 border-l-4 border-[#8b2020] p-6 rounded-r-lg"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg font-bold text-[#d4c5a9] mb-2">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function StageDetail({
  year,
  title,
  points,
}: {
  year: string
  title: string
  points: Array<{ subtitle: string; content: string }>
}) {
  return (
    <motion.div
      className="bg-[#2a2a2a]/30 border border-gray-800 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#8b2020] font-mono text-sm">{year}</span>
        <h4 className="text-2xl font-bold text-[#d4c5a9]">{title}</h4>
      </div>
      <div className="space-y-4">
        {points.map((point, index) => (
          <div key={index}>
            <h5 className="text-lg font-semibold text-gray-300 mb-2">
              {point.subtitle}
            </h5>
            <p className="text-gray-400 leading-relaxed">{point.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ImpactCard({
  title,
  content,
  points,
}: {
  title: string
  content?: string
  points?: Array<{ subtitle: string; content: string }>
}) {
  return (
    <motion.div
      className="bg-[#2a2a2a]/50 border-2 border-gray-800 rounded-lg p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-[#d4c5a9] mb-4">{title}</h3>
      {content && <p className="text-gray-400 leading-relaxed">{content}</p>}
      {points && (
        <div className="space-y-4 mt-4">
          {points.map((point, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">
                {point.subtitle}
              </h4>
              <p className="text-gray-400 leading-relaxed">{point.content}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
