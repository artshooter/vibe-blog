'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import ConvolutionVisualizer from './ConvolutionVisualizer'
import TerminalSection from './TerminalSection'
import TerminalDetails from './TerminalDetails'
import FormattedText from './FormattedText'

export default function Content() {
  const t = useTranslations('mnist-neural-network')

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e7eb] font-mono">
      <BackButton variant="terminal" />
      {/* Hero */}
      <Hero />

      {/* Main content container */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">

        {/* Overview Section */}
        <TerminalSection command="./mnist --overview" title={t('sections.overview.title')}>
          <div className="space-y-4 leading-relaxed">
            <p>{t('sections.overview.intro')}</p>

            <div className="my-6 p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/20">
              <div className="text-[#8be9fd] mb-2">{t('sections.overview.flowTitle')}:</div>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#50fa7b]">→</span>
                  <span>{t('sections.overview.flow.step1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#50fa7b]">→</span>
                  <span>{t('sections.overview.flow.step2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#50fa7b]">→</span>
                  <span>{t('sections.overview.flow.step3')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#50fa7b]">→</span>
                  <span>{t('sections.overview.flow.step4')}</span>
                </div>
              </div>
            </div>
          </div>
        </TerminalSection>

        {/* Convolution Layer Section */}
        <TerminalSection
          command="./mnist --explain convolution"
          title={t('sections.convolution.title')}
        >
          <div className="space-y-6">
            <p className="leading-relaxed">{t('sections.convolution.intro')}</p>

            <div className="my-8">
              <div className="text-[#6272a4] text-sm mb-4">
                # {t('sections.convolution.visualizer.title')}
              </div>
              <ConvolutionVisualizer />
            </div>

            <div className="space-y-4">
              <h3 className="text-[#f1fa8c] text-lg">{t('sections.convolution.howItWorks.title')}</h3>
              <div className="space-y-3 text-sm leading-relaxed">
                <p>{t('sections.convolution.howItWorks.step1')}</p>
                <p>{t('sections.convolution.howItWorks.step2')}</p>
                <p>{t('sections.convolution.howItWorks.step3')}</p>
              </div>
            </div>

            {/* Detailed convolution calculation */}
            <TerminalDetails command={t('details.convolution.command')}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#f1fa8c] text-lg mb-3">{t('details.convolution.title')}</h3>
                  <p className="leading-relaxed mb-4">{t('details.convolution.intro')}</p>
                </div>

                <div className="space-y-4 text-sm">
                  {Object.values(t.raw('details.convolution.steps') as Record<string, string>).map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-[#50fa7b]">•</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                  <FormattedText text={t('details.convolution.calculation')} className="text-xs leading-relaxed font-mono" />
                </div>

                <div className="p-4 bg-[#0d0d0d]/50 rounded">
                  <div className="text-[#8be9fd] mb-2">💡 {t('details.convolution.insight').split('：\n')[0]}:</div>
                  <FormattedText text={t('details.convolution.insight').split('：\n')[1]} className="text-sm leading-relaxed" />
                </div>

                <div className="p-4 bg-[#0d0d0d]/50 rounded">
                  <div className="text-[#f1fa8c] mb-2">{t('details.convolution.comparison').split('：\n')[0]}:</div>
                  <FormattedText text={t('details.convolution.comparison').split('：\n')[1]} className="text-sm leading-relaxed" />
                </div>
              </div>
            </TerminalDetails>
          </div>
        </TerminalSection>

        {/* Activation Function Section */}
        <TerminalSection
          command="./mnist --explain activation"
          title={t('sections.activation.title')}
        >
          <div className="space-y-6">
            <p className="leading-relaxed">{t('sections.activation.intro')}</p>

            <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/20">
              <div className="text-[#8be9fd] mb-3">ReLU Function:</div>
              <div className="font-mono text-sm">
                <div className="text-[#6272a4]"># Input</div>
                <div className="mb-2">[ 3  2  1 ]</div>
                <div className="mb-2">[ 1  1  1 ]</div>
                <div className="mb-4">[-1 -1 -1 ]</div>

                <div className="text-[#50fa7b]">$ ./activate --function ReLU</div>
                <div className="my-2 text-[#6272a4]">&gt; ReLU(x) = max(0, x)</div>

                <div className="text-[#6272a4]"># Output</div>
                <div className="mb-2">[ 3  2  1 ]</div>
                <div className="mb-2">[ 1  1  1 ]</div>
                <div className="text-[#f1fa8c]">[ 0  0  0 ]  ← negative values become 0</div>
              </div>
            </div>

            <p className="text-sm leading-relaxed">{t('sections.activation.explanation')}</p>

            {/* Detailed activation function explanation */}
            <TerminalDetails command={t('details.activation.command')}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#f1fa8c] text-lg mb-3">{t('details.activation.title')}</h3>
                  <p className="leading-relaxed mb-4">{t('details.activation.intro')}</p>
                </div>

                <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                  <FormattedText text={t('details.activation.example')} className="text-sm leading-relaxed font-mono" />
                </div>

                <div>
                  <h4 className="text-[#8be9fd] text-base mb-3">{t('details.activation.explanation')}</h4>
                  <div className="space-y-4 text-sm">
                    <div className="p-4 bg-[#0d0d0d]/50 rounded">
                      <div className="text-[#50fa7b] mb-2">1. {t('details.activation.reasons.linearity').split('：')[0]}:</div>
                      <p className="leading-relaxed">{t('details.activation.reasons.linearity').split('：')[1]}</p>
                    </div>
                    <div className="p-4 bg-[#0d0d0d]/50 rounded">
                      <div className="text-[#50fa7b] mb-2">2. {t('details.activation.reasons.nonlinearity').split('：')[0]}:</div>
                      <p className="leading-relaxed">{t('details.activation.reasons.nonlinearity').split('：')[1]}</p>
                    </div>
                    <div className="p-4 bg-[#0d0d0d]/50 rounded">
                      <div className="text-[#50fa7b] mb-2">3. {t('details.activation.reasons.selectivity').split('：')[0]}:</div>
                      <p className="leading-relaxed">{t('details.activation.reasons.selectivity').split('：')[1]}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0d0d0d]/50 rounded">
                  <div className="text-[#f1fa8c] mb-2">{t('details.activation.otherFunctions').split('：\n')[0]}:</div>
                  <FormattedText text={t('details.activation.otherFunctions').split('：\n')[1]} className="text-sm leading-relaxed" />
                </div>
              </div>
            </TerminalDetails>
          </div>
        </TerminalSection>

        {/* Fully Connected Layer Section */}
        <TerminalSection
          command="./mnist --explain fully-connected"
          title={t('sections.fullyConnected.title')}
        >
          <div className="space-y-6">
            <p className="leading-relaxed">{t('sections.fullyConnected.intro')}</p>

            <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/20 font-mono text-sm">
              <div className="text-[#50fa7b] mb-2">$ ./classify --input features.txt</div>
              <div className="text-[#6272a4] mb-3">&gt; Computing scores for digits 0-9...</div>

              <div className="space-y-1">
                {[
                  { digit: 0, score: 0.09, bar: 9 },
                  { digit: 1, score: 0.02, bar: 2 },
                  { digit: 2, score: 0.05, bar: 5 },
                  { digit: 3, score: 0.09, bar: 9 },
                  { digit: 4, score: 0.12, bar: 12 },
                  { digit: 5, score: 0.04, bar: 4 },
                  { digit: 6, score: 0.05, bar: 5 },
                  { digit: 7, score: 0.91, bar: 91 },
                  { digit: 8, score: 0.06, bar: 6 },
                  { digit: 9, score: 0.08, bar: 8 },
                ].map((item) => (
                  <div key={item.digit} className="flex items-center gap-2">
                    <span className="w-8">{item.digit}:</span>
                    <div className="flex-1 h-5 bg-[#0a0a0a] rounded overflow-hidden">
                      <div
                        className={`h-full ${item.digit === 7 ? 'bg-[#f1fa8c]' : 'bg-[#50fa7b]'}`}
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                    <span className={`w-12 text-right ${item.digit === 7 ? 'text-[#f1fa8c]' : ''}`}>
                      {item.score.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[#f1fa8c]">
                &gt; Prediction: 7 (confidence: 91%)
              </div>
            </div>

            <p className="text-sm leading-relaxed">{t('sections.fullyConnected.explanation')}</p>

            {/* Detailed fully connected layer explanation */}
            <TerminalDetails command={t('details.fullyConnected.command')}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#f1fa8c] text-lg mb-3">{t('details.fullyConnected.title')}</h3>
                  <p className="leading-relaxed mb-4">{t('details.fullyConnected.intro')}</p>
                </div>

                <div className="space-y-5">
                  <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                    <div className="text-[#50fa7b] mb-2">{t('details.fullyConnected.process.flatten').split('：\n')[0]}</div>
                    <FormattedText text={t('details.fullyConnected.process.flatten').split('：\n\n')[1]} className="text-sm leading-relaxed font-mono" />
                  </div>

                  <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                    <div className="text-[#50fa7b] mb-2">{t('details.fullyConnected.process.weights').split('：\n')[0]}</div>
                    <FormattedText text={t('details.fullyConnected.process.weights').split('：\n\n')[1]} className="text-sm leading-relaxed font-mono" />
                  </div>

                  <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                    <div className="text-[#50fa7b] mb-2">{t('details.fullyConnected.process.calculation').split('：\n')[0]}</div>
                    <FormattedText text={t('details.fullyConnected.process.calculation').split('：\n\n')[1]} className="text-sm leading-relaxed font-mono" />
                  </div>
                </div>

                <div className="p-4 bg-[#0d0d0d]/50 rounded">
                  <div className="text-[#f1fa8c] mb-2">{t('details.fullyConnected.output').split('：\n')[0]}:</div>
                  <FormattedText text={t('details.fullyConnected.output').split('：\n')[1]} className="text-sm leading-relaxed font-mono" />
                </div>

                <div className="p-4 bg-[#0d0d0d]/50 rounded">
                  <div className="text-[#8be9fd] mb-2">{t('details.fullyConnected.insight').split('：\n')[0]}:</div>
                  <FormattedText text={t('details.fullyConnected.insight').split('：\n')[1]} className="text-sm leading-relaxed" />
                </div>
              </div>
            </TerminalDetails>
          </div>
        </TerminalSection>

        {/* Training Section */}
        <TerminalSection
          command="./mnist --explain training"
          title={t('sections.training.title')}
        >
          <div className="space-y-6">
            <p className="leading-relaxed">{t('sections.training.intro')}</p>

            <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/20 font-mono text-sm">
              <div className="text-[#50fa7b] mb-2">$ ./train --epochs 5 --batch-size 32</div>
              <div className="text-[#6272a4] mb-3">&gt; Training neural network...</div>

              <div className="space-y-2">
                {[
                  { epoch: 1, loss: 2.3025, acc: 45 },
                  { epoch: 2, loss: 1.9821, acc: 62 },
                  { epoch: 3, loss: 1.2456, acc: 78 },
                  { epoch: 4, loss: 0.8234, acc: 87 },
                  { epoch: 5, loss: 0.4521, acc: 93 },
                ].map((item) => (
                  <div key={item.epoch}>
                    <div className="flex items-center gap-2">
                      <span className="text-[#8be9fd]">Epoch {item.epoch}/5</span>
                      <span className="text-[#6272a4]">Loss: {item.loss.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">Progress:</span>
                      <div className="flex-1 h-4 bg-[#0a0a0a] rounded overflow-hidden">
                        <div
                          className="h-full bg-[#50fa7b]"
                          style={{ width: `${item.acc}%` }}
                        />
                      </div>
                      <span className="text-xs">{item.acc}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[#50fa7b]">
                &gt; Training complete! Final accuracy: 93%
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="text-[#f1fa8c] mb-2">{t('sections.training.lossFunction.title')}</h4>
                <p className="leading-relaxed">{t('sections.training.lossFunction.description')}</p>
              </div>

              <div>
                <h4 className="text-[#f1fa8c] mb-2">{t('sections.training.gradient.title')}</h4>
                <p className="leading-relaxed">{t('sections.training.gradient.description')}</p>
              </div>

              <div>
                <h4 className="text-[#f1fa8c] mb-2">{t('sections.training.optimization.title')}</h4>
                <p className="leading-relaxed">{t('sections.training.optimization.description')}</p>
              </div>
            </div>

            {/* Detailed training process explanation */}
            <TerminalDetails command={t('details.training.command')}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#f1fa8c] text-lg mb-3">{t('details.training.title')}</h3>
                </div>

                {/* Loss Function */}
                <div className="space-y-4">
                  <h4 className="text-[#8be9fd] text-base">{t('details.training.lossFunction.title')}</h4>
                  <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                    <div className="text-[#50fa7b] mb-2">{t('details.training.lossFunction.formula')}</div>
                    <FormattedText text={t('details.training.lossFunction.example')} className="text-sm leading-relaxed font-mono mt-3" />
                  </div>
                  <p className="text-sm leading-relaxed">{t('details.training.lossFunction.meaning')}</p>
                </div>

                {/* Gradient Calculation */}
                <div className="space-y-4">
                  <h4 className="text-[#8be9fd] text-base">{t('details.training.gradient.title')}</h4>
                  <p className="text-sm leading-relaxed">{t('details.training.gradient.intro')}</p>
                  <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                    <FormattedText text={t('details.training.gradient.calculation')} className="text-sm leading-relaxed font-mono" />
                  </div>
                  <div className="p-4 bg-[#0d0d0d]/50 rounded">
                    <div className="text-[#f1fa8c] mb-2">{t('details.training.gradient.backprop').split('：\n')[0]}:</div>
                    <FormattedText text={t('details.training.gradient.backprop').split('：\n')[1]} className="text-sm leading-relaxed" />
                  </div>
                </div>

                {/* Optimization */}
                <div className="space-y-4">
                  <h4 className="text-[#8be9fd] text-base">{t('details.training.optimization.title')}</h4>
                  <div className="p-4 bg-[#0d0d0d] rounded border border-[#8be9fd]/30">
                    <div className="text-[#50fa7b] mb-2">{t('details.training.optimization.formula')}</div>
                    <FormattedText text={t('details.training.optimization.example')} className="text-sm leading-relaxed font-mono mt-3" />
                  </div>
                  <div className="p-4 bg-[#0d0d0d]/50 rounded">
                    <div className="text-[#f1fa8c] mb-2">{t('details.training.optimization.iterations').split('：\n')[0]}:</div>
                    <FormattedText text={t('details.training.optimization.iterations').split('：\n')[1]} className="text-sm leading-relaxed" />
                  </div>
                </div>
              </div>
            </TerminalDetails>
          </div>
        </TerminalSection>

        {/* Summary */}
        <TerminalSection
          command="./mnist --summary"
          title={t('sections.summary.title')}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">{t('sections.summary.content')}</p>

            <div className="mt-8 p-4 bg-[#0d0d0d] rounded border border-[#50fa7b]/20">
              <div className="text-[#50fa7b] mb-2">$ exit</div>
              <div className="text-[#6272a4]">Tutorial completed.</div>
              <div className="text-[#6272a4]">Logout</div>
              <div className="mt-2 text-[#6272a4]">[Process completed]</div>
            </div>
          </div>
        </TerminalSection>

      </div>
    </div>
  )
}
