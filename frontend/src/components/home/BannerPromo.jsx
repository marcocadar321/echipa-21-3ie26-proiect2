export default function BannerPromo({ data }) {
  if (!data) return null

  return (
    <div style={{ backgroundColor: data.CuloareFund || '#C8A882' }} className="w-full py-2.5 px-4 text-center text-white text-sm font-light tracking-widest uppercase">
      <span>{data.TextBanner}</span>
    </div>
  )
}