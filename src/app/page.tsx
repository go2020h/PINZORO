"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedQR, setSelectedQR] = useState<number | null>(null);

  // 12店舗のデータ
  const shops = [
    { 
      id: 1, 
      name: "50円焼き鳥 絶好鳥 西葛西店", 
      address: "東京都江戸川区西葛西5-5−16 2F", 
      tel: "03-5679-5640", 
      url: "https://zekkohcho.com/shop/nishikasaiten/" 
    },
    { 
      id: 2, 
      name: "50円焼き鳥 絶好鳥 平井本店", 
      address: "東京都江戸川区平井6-37-1", 
      tel: "03-6231-9494", 
      url: "https://zekkohcho.com/shop/hiraihonten/" 
    },
    { 
      id: 3, 
      name: "50円焼き鳥 絶好鳥 船堀店", 
      address: "東京都江戸川区船堀１-7-6 夢ビル1階", 
      tel: "03-5878-0660", 
      url: "https://zekkocho-funabori.owst.jp/" 
    },
    { 
      id: 4, 
      name: "50円焼き鳥 絶好鳥 瑞江店", 
      address: "東京都江戸川区瑞江２-1-8", 
      tel: "03-6231-8111", 
      url: "https://zekkohcho.com/shop/mizueten/" 
    },
    { 
      id: 5, 
      name: "50円焼き鳥 絶好鳥 市川店", 
      address: "千葉県市川市市川1-2-5 2F", 
      tel: "047-322-8593", 
      url: "https://akr8213898010.owst.jp/" 
    },
    { 
      id: 6, 
      name: "50円焼き鳥 絶好鳥 本八幡店", 
      address: "千葉県市川市南八幡４-3-3", 
      tel: "047-316-1118", 
      url: "https://zekkoucho-motoyawata.owst.jp/" 
    },
    { 
      id: 7, 
      name: "50円串揚げぜっこうちょう 西船橋店", 
      address: "千葉県船橋市西船4-20-7　SAP西船橋駅前ビル2F", 
      tel: "047-497-8383", 
      url: "https://zekkoucho-nishifunabashi.owst.jp/" 
    },
    { 
      id: 8, 
      name: "ぜっこうちょう 其の八 扇橋店", 
      address: "東京都江東区扇橋２-5-10", 
      tel: "03-6666-1711", 
      url: "https://zekkocho-ogibashi.owst.jp/" 
    },
    { 
      id: 9, 
      name: "酒肴鮨 ぜっこうちょう 下谷店", 
      address: "東京都台東区下谷3-11-9 ライオンズマンション 1F", 
      tel: "03-6802-3300", 
      url: "https://zekkochoiriya.owst.jp/" 
    },
    { 
      id: 10, 
      name: "沖縄料理ぜっこうちょう 那覇松山店", 
      address: "沖縄県那覇市松山１-18-13 101号室", 
      tel: "098-963-9944", 
      url: "https://zekkocho-nahamatsuyama.owst.jp/" 
    },
    { 
      id: 11, 
      name: "和牛焼肉 牛WAKA丸 新橋店", 
      address: "東京都港区新橋６-10-3 アパホテル新橋御成門 1F", 
      tel: "03-6809-1429", 
      url: "https://ushiwakamaru-shinbasi.owst.jp/" 
    },
    { 
      id: 12, 
      name: "下町もんじゃ・お好み焼き 居酒屋 ぴんぞろ 瑞江店", 
      address: "東京都江戸川区瑞江2-1-8 アバンドビル2F", 
      tel: "050-5492-3303", 
      url: "https://ghga603.gorp.jp/" 
    },
  ];

  // 現在表示する店舗を取得（スマホ表示では3店舗、PC表示では6店舗）
  const itemsPerPage = isMobile ? 3 : 6;
  const totalPages = isMobile ? Math.ceil(shops.length / 3) : Math.ceil(shops.length / 6);
  const currentShops = shops.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // ページを切り替える関数
  const changePage = (newPage: number) => {
    if (isAnimating) return;
    setCurrentPage(newPage);
  };

  // ウィンドウサイズの変更を検知
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // 初期化時にも実行
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // QRコードポップアップを閉じる関数
  const closeQRPopup = () => {
    setSelectedQR(null);
  };

  return (
    <div className="flex flex-col min-h-[85vh]">
      {/* QRコードポップアップ */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 bg-gray-800" onClick={closeQRPopup}>
          <div className="relative bg-white p-4 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={closeQRPopup}
            >
              ✕
            </button>
            <div className="relative w-64 h-64 mx-auto">
              <Image 
                src={`/shop${selectedQR}_qr.png`} 
                alt="QRコード拡大表示" 
                fill
                style={{ objectFit: "contain" }}
                className="p-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* ヒーローセクション */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center yellow-bg overflow-hidden"
        style={{
          backgroundImage: 'url("/back.jpg")',
          backgroundSize: '150px',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'soft-light',
          backgroundColor: 'rgba(249, 217, 73, 0.9)'
        }}
      >
        <div className="container mx-auto px-4 z-10 text-center py-8">
          <div className="mb-4 inline-block bg-white rounded-full px-10 py-3">
            <h2 className="text-3xl md:text-5xl font-bold text-red-600">美味しい焼き鳥と笑顔のある店へ</h2>
          </div>
          <h1 className="pop-title mb-4 text-7xl md:text-[10rem] leading-tight">ONE SEAT<br/>ONE SMILE</h1>
          <p className="text-2xl md:text-4xl mb-8 max-w-6xl mx-auto font-bold">
            お客様一人ひとりに笑顔をお届けすることが私たちの使命です。<br/>
            一席ごとに心を込めたサービスで、かけがえのない時間を提供します。
          </p>
          <Link href="#recruit" className="pop-button inline-block hover:bg-red-700 text-white font-bold py-5 px-16 rounded-full transition-all transform hover:scale-105 text-2xl md:text-3xl">
            一緒に働く
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* TOP MESSAGE */}
      <section className="py-10 bg-white" id="message">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">TOP MESSAGE</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2 text-red-600">企業理念</h3>
                <p className="text-4xl font-bold mb-4 inline-block border-b-4 border-yellow-400 pb-2 text-black">一席一笑</p>
                <p className="text-lg mt-4 text-black">
                  お客様一人ひとりに笑顔をお届けすることが私たちの使命です。<br/>
                  一席ごとに心を込めたサービスで、かけがえのない時間を提供します。
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3 text-red-600">地域密着型出店</h4>
                  <p className="text-black">
                    PINZOROは地域の特性を活かした店舗展開を行っています。<br/>
                    地元の食材や文化を取り入れ、その地域ならではの体験を提供することで、
                    お客様との深い絆を築いています。
                  </p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3 text-red-600">仕事も行事も楽しめる集団</h4>
                  <p className="text-black">
                    PINZOROでは、仕事だけでなく様々な行事やイベントを通じて、
                    スタッフ同士の絆を深め、活気ある職場環境を作っています。<br/>
                    楽しく働くことが、最高のサービスにつながると信じています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section 
        className="py-20 yellow-bg relative overflow-hidden" 
        id="business"
        style={{
          backgroundImage: 'url("/back.jpg")',
          backgroundSize: '150px',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'soft-light',
          backgroundColor: 'rgba(249, 217, 73, 0.9)'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="section-title mb-16">BUSINESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">PINZOROについて</h3>
              <p className="text-lg mb-4 text-black">
                PINZOROは「50円焼き鳥 絶好鳥」を中心に、お客様に喜んでいただける飲食店を展開しています。東京都と千葉県を中心に12店舗を運営し、リーズナブルな価格で高品質な焼き鳥を提供しています。
              </p>
              <p className="text-lg mb-4 text-black">
                各店舗では、アットホームな雰囲気の中で気軽に楽しめる焼き鳥と、厳選されたドリンクをご用意。個性豊かなスタッフが、お客様一人ひとりに心のこもったサービスを提供します。
              </p>
              <p className="text-lg mb-0 text-black">
                また、社内行事の充実や風通しの良い職場環境づくりにも力を入れており、スタッフ同士の絆を大切にしながら、日々成長を続けています。若いメンバーが多く、活気あふれる企業として、今後も新たな価値の創造に挑戦していきます。
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden w-4/5 mx-auto" style={{ paddingBottom: '45%' }}>
              <Image 
                src="/business.png" 
                alt="PINZOROビジネス" 
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/company" className="pop-button inline-block">
              会社概要を見る
            </Link>
          </div>
        </div>
      </section>

      {/* PINZORO体験セクション */}
      <section 
        className="py-20 relative overflow-hidden bg-white" 
        id="youtube"
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="section-title mb-16">PINZORO体験</h2>
          <div className="max-w-6xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-xl mb-12" style={{ 
              backgroundImage: 'url("/back.jpg")',
              backgroundSize: '150px',
              backgroundRepeat: 'repeat',
              backgroundBlendMode: 'soft-light',
              backgroundColor: 'rgba(249, 217, 73, 0.9)'
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-0 overflow-hidden flex items-center justify-center">
                  <div className="relative w-full md:w-11/12 mx-auto" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '0.75rem' }}>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full" 
                      src="https://www.youtube.com/embed/9AthTj8BWcE?rel=0" 
                      title="５０円焼きとり絶好鳥　球技大会" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between order-1 md:order-2" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full mb-3">動画</div>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">５０円焼きとり絶好鳥　球技大会</h3>
                    <p className="text-lg mb-4 text-black">
                      お付き合いのある会社さんと合同でスポーツ大会を開催しました。バスケットボールとボーリングで熱い戦いを繋り広げています！
                    </p>
                    <p className="text-lg mb-6 text-black font-bold">
                      PINZOROでは、仕事だけでなく社員同士や他企業との交流も大切にしています。<br/>明るく活気のある職場環境で、チームワークを育みながら日々成長しています。
                    </p>
                  </div>
                  <div className="text-center">
                    <Link 
                      href="https://www.youtube.com/@pinzoro" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="pop-button inline-block text-center"
                    >
                      Youtubeチャンネルを見る
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-6xl mx-auto"><div className="rounded-xl overflow-hidden shadow-xl mb-12" style={{ 
            backgroundImage: 'url("/back.jpg")',
            backgroundSize: '150px',
            backgroundRepeat: 'repeat',
            backgroundBlendMode: 'soft-light',
            backgroundColor: 'rgba(249, 217, 73, 0.9)'
          }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
                <div className="p-8 flex flex-col justify-between order-2 md:order-1" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full mb-3">環境</div>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">楽しく働ける環境づくり</h3>
                    <p className="text-lg mb-4 text-black">
                      PINZOROでは、仕事だけでなく、スタッフ同士の交流も大切にしています。社員旅行やBBQ、スポーツ大会など、様々なイベントを通じて絆を深めています。
                    </p>
                    <p className="text-lg mb-4 text-black">
                      若いメンバーが多く、活気あふれる職場環境の中で、一人ひとりが自分らしく輝ける場所を提供しています。風通しの良い職場で、アイデアを出し合い、共に成長していくことを大切にしています。
                    </p>
                    <p className="text-lg mb-4 text-black font-bold">
                      私たちと一緒に、お客様に笑顔を届けながら、自分自身も成長していきませんか？
                    </p>
                  </div>
                </div>
                <div className="relative overflow-hidden order-1 md:order-2 flex items-center justify-center" style={{ paddingTop: '20px', paddingLeft: '15px', paddingRight: '15px' }}>
                  <div className="relative w-11/12 mx-auto flex items-center justify-center" style={{ width: '90%', height: '0', paddingBottom: '50.625%', position: 'relative' }}>
                    {[1, 2, 3, 4].map((num) => (
                      <div 
                        key={num}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ 
                          opacity: 0,
                          animation: `fadeInOut 16s infinite ${(num - 1) * 4}s`,
                        }}
                      >
                        <Image 
                          src={`/staff/fun${num}.jpg`} 
                          alt={`PINZOROスタッフ ${num}`} 
                          fill
                          className="rounded-xl"
                          style={{ objectFit: "cover", objectPosition: "center 40%" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl mb-12" style={{ 
            backgroundImage: 'url("/back.jpg")',
            backgroundSize: '150px',
            backgroundRepeat: 'repeat',
            backgroundBlendMode: 'soft-light',
            backgroundColor: 'rgba(249, 217, 73, 0.9)'
          }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
                <div className="relative overflow-hidden order-1 md:order-1 flex items-center justify-center" style={{ height: '400px', padding: '20px 0' }}>
                  <div className="relative h-full w-9/12 mx-auto flex items-center justify-center rounded-xl overflow-hidden">
                    {[1, 2, 3, 4].map((num) => (
                      <div 
                        key={num}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ 
                          opacity: 0,
                          animation: `fadeInOut 16s infinite ${(num - 1) * 4}s`,
                        }}
                      >
                        <Image 
                          src={`/staff/staff${num}.jpg`} 
                          alt={`PINZOROスタッフ ${num}`} 
                          fill
                          style={{ objectFit: "contain", objectPosition: "center center", borderRadius: "0.75rem" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center order-2 md:order-2" style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="py-6">
                    <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full mb-3">スタッフ</div>
                    <h3 className="text-2xl font-bold mb-6 text-red-600">スタッフ紹介</h3>
                    <p className="text-lg mb-6 text-black">
                      PINZOROでは、個性豊かなスタッフが集まり、日々楽しく仕事に取り組んでいます。
                    </p>
                    <p className="text-lg mb-8 text-black">
                      スタッフ同士の絆を大切にし、お互いに助け合いながら成長しています。若いメンバーが多く、活気あふれる職場環境です。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 店舗紹介セクション */}
      <section 
        className="py-20 yellow-bg relative overflow-hidden" 
        id="shops"
        style={{
          backgroundImage: 'url("/back.jpg")',
          backgroundSize: '150px',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'soft-light',
          backgroundColor: 'rgba(249, 217, 73, 0.9)'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="section-title mb-16">SHOPS</h2>
          <div className="relative px-2 sm:px-4 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentShops.map((shop) => (
                <div key={shop.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
                  <div className="relative pb-[66.67%] bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src={`/shop${shop.id}.jpg`} 
                        alt={shop.name} 
                        fill
                        style={{ objectFit: "cover" }}
                        className="absolute inset-0"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                        <p className="text-black mb-1">{shop.address}</p>
                        <p className="text-black mb-1">TEL: {shop.tel}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0 flex items-center justify-center w-full md:w-auto md:justify-start">
                        <div 
                          className="relative w-28 h-28 md:w-32 md:h-32 cursor-pointer transition-transform hover:scale-105"
                          onClick={() => setSelectedQR(shop.id)}
                        >
                          <Image 
                            src={`/shop${shop.id}_qr.png`} 
                            alt={`${shop.name}のQRコード`} 
                            fill
                            style={{ objectFit: "contain" }}
                            className="p-1"
                          />
                        </div>
                      </div>
                      <div className="mt-4 hidden md:block"></div>
                    </div>
                    <div className="mt-4 flex justify-start">
                      <Link href={shop.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 font-bold">
                        店舗ページ →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={() => currentPage > 0 && changePage(currentPage - 1)}
                className={`px-4 py-2 rounded-md ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'} transition-colors`}
                disabled={currentPage === 0}
                aria-label="前のページへ"
              >
                <FaChevronLeft />
              </button>
              
              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => changePage(index)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${currentPage === index ? 'bg-red-600 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => currentPage < totalPages - 1 && changePage(currentPage + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'} transition-colors`}
                disabled={currentPage === totalPages - 1}
                aria-label="次のページへ"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 求人セクション */}
      <section className="py-20 bg-white" id="recruit">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">RECRUIT</h2>
          <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">一緒に働きませんか？</h3>
              <p className="text-lg mb-6 text-center">
                PINZOROでは、共に成長できる仲間を募集しています。私たちと一緒に新しい価値を創造しましょう。
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3 text-red-600">採用したい人材</h4>
                  <ul className="list-disc pl-5 text-black space-y-2">
                    <li>仕事も遊びも楽しめる人材</li>
                    <li>理念を共感できる人材</li>
                    <li>チームワークを大切にする人材</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3 text-red-600">採用した人材の将来像</h4>
                  <p className="text-black">
                    企業として拡大していく中で、前線で活躍出来る存在になってほしいです。自ら考え、行動し、成長し続ける人を応援します。
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3 text-red-600">競合他社と違うところ</h4>
                  <ul className="list-disc pl-5 text-black space-y-2">
                    <li>社内行事が充実（社員旅行、BBQなど）</li>
                    <li>若いメンバーが活躍（20代～30代がほとんど）</li>
                    <li>風通しの良い職場環境</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-center text-lg my-8 text-black font-bold">
                各店舗へのお問い合わせや応募のご連絡をお待ちしております。
              </p>
              <div className="flex justify-center mb-10">
                <Link href="#shops" className="pop-button inline-block text-center">
                  店舗情報を見る
                </Link>
              </div>
              
              <div className="mt-12 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">事務員募集</h3>
                <div className="bg-yellow-50 p-6 rounded-lg max-w-3xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-bold mb-3 text-red-600">業務内容</h4>
                      <ul className="list-disc pl-5 text-black space-y-2">
                        <li>飲食店の経理業務</li>
                        <li>勤怠管理</li>
                        <li>各店舗記入用紙からパソコン数値入力など</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 text-red-600">勤務地</h4>
                      <p className="text-black mb-2">
                        〒130-0022<br/>
                        東京都墨田区江東橋2-8-1<br/>
                        ワコーレ錦糸町マンション1F E室
                      </p>
                      <p className="text-sm text-gray-600 mt-2">※店舗ではなく事務所での勤務となります</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-lg mb-6 text-black font-bold">
                事務所へのお問い合わせや応募のご連絡もお待ちしております。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
