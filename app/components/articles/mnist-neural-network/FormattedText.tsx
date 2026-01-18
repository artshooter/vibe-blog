interface FormattedTextProps {
  text: string | undefined
  className?: string
}

export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  // 处理 undefined 或空字符串
  if (!text) {
    return null
  }

  // 将 \n 转换为实际的换行
  const lines = text.split('\n')

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </div>
  )
}
