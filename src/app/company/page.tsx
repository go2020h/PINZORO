export default function Company() {
  return (
    <div className="py-20 bg-[#FFD800]">
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">会社概要</h1>
        
        {/* 会社情報 */}
        <section className="mb-20">
          <h2 className="section-title mb-16">会社情報</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg border-2 border-black">
            <div className="p-4 sm:p-8">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">法人名</th>
                    <td className="py-4 px-6 text-black">株式会社PINZORO</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">取締役会長</th>
                    <td className="py-4 px-6 text-black">近藤 大貴</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">代表取締役</th>
                    <td className="py-4 px-6 text-black">松本 昌翁</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">本店住所</th>
                    <td className="py-4 px-6 text-black">東京都江戸川区平井六丁目37番1号</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">事務所所在</th>
                    <td className="py-4 px-6 text-black">東京都墨田区江東橋２−８−１</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">会社設立</th>
                    <td className="py-4 px-6 text-black">平成29年4月21日</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">資本金</th>
                    <td className="py-4 px-6 text-black">5,000,000円</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">主な事業</th>
                    <td className="py-4 px-6 text-black">飲食店の経営、企画及び管理</td>
                  </tr>
                  <tr>
                    <th className="py-4 px-2 sm:px-6 text-left bg-yellow-50 w-1/3 font-bold whitespace-nowrap">店舗数</th>
                    <td className="py-4 px-6 text-black">全国12店舗（直営店）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        
      </div>
    </div>
  );
}
