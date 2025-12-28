
import { Link } from '@/i18n/navigation'

export default function HeroCompact() {
    return (
        <Link href="/world-war-i" className="block group">
            <div className="relative overflow-hidden rounded-xl bg-[#2a2622] text-[#e3d8c8] p-6 border border-[#4a4238] hover:border-[#8c7b65] transition-colors duration-300">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-[#8c7b65] font-serif uppercase tracking-wider">
                        <span>1914-1918</span>
                        <span className="w-1 h-1 rounded-full bg-[#8c7b65]" />
                        <span>History</span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif group-hover:text-white transition-colors">
                        第一次世界大战
                    </h3>
                    <p className="text-[#a69b8b] line-clamp-2">
                        从萨拉热窝的枪声到凡尔赛的合约，回顾人类历史的至暗时刻。
                    </p>
                </div>

                {/* Decorative noise/texture overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('/noise.png')]"></div>
            </div>
        </Link>
    )
}
