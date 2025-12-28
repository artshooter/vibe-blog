
export default function ImpactGrid() {
    const impacts = [
        {
            title: '政治格局重塑',
            content: '四大帝国（德意志、奥匈、奥斯曼、沙俄）彻底瓦解。凡尔赛体系确立，国际联盟诞生。',
            icon: '🏛️',
        },
        {
            title: '欧洲经济衰退',
            content: '主要参战国耗尽国力，背负巨额债务。生产力严重破坏，经济重心开始向美国转移。',
            icon: '📉',
        },
        {
            title: '社会观念剧变',
            content: '数千万人伤亡引发了对战争荣耀的幻灭。反战思潮兴起，英雄主义让位于现实主义。',
            icon: '🕊️',
        },
        {
            title: '女性地位提升',
            content: '战时劳动力短缺促使女性大规模走向工作岗位，为战后争取选举权奠定基础。',
            icon: '👩‍🏭',
        },
    ]

    return (
        <div className="py-20">
            <h2 className="text-3xl font-serif font-bold text-[#e3d8c8] text-center mb-12">
                战后影响
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
                {impacts.map((impact, index) => (
                    <div
                        key={index}
                        className="group relative bg-[#2a2622] p-8 rounded-lg border border-[#4a4238] hover:border-[#8c7b65] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Hover Effect Background */}
                        <div className="absolute inset-0 bg-[#8c7b65] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                        <div className="relative z-10 flex gap-6 items-start">
                            <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                                {impact.icon}
                            </span>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-[#e3d8c8] mb-3 group-hover:text-white transition-colors">
                                    {impact.title}
                                </h3>
                                <p className="text-[#a69b8b] text-sm leading-relaxed">
                                    {impact.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
