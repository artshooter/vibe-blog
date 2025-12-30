import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const mnistArticle: Article = {
  meta: {
    articleName: 'mnist-neural-network',
    title: 'MNIST - 从零手撸神经网络',
    description: '理解手写数字识别背后的原理：卷积层、激活函数、全连接层如何协同工作，以及如何通过梯度下降训练模型',
    date: '2025-12-28',
    tags: ['机器学习', '神经网络', '深度学习', 'MNIST', '教程'],
    status: 'published',
  },
  Hero,
  Content,
}
