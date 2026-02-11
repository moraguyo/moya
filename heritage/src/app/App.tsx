import { useState, useEffect, useRef } from 'react';

const timelineData = [
  {
    year: '1952',
    title: 'Seeds of Hope',
    description: '전쟁의 상흔 속에서도 소수의 성도들이 모여 기도의 등불을 밝혔습니다. 그것은 다음 세기를 견뎌낼 믿음의 씨앗이었습니다.',
    image: 'https://images.unsplash.com/photo-1762777125835-fb9833fb931e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwdmludGFnZSUyMHdvcnNoaXAlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzcwMTI1MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alignment: 'left',
  },
  {
    year: '1968',
    title: 'Rising Spires',
    description: '새로운 성전의 정초석을 놓으며, 지역 사회를 위한 영적 보금자리를 마련했습니다. 건물을 넘어 신앙의 지평을 넓히는 시기였습니다.',
    image: 'https://images.unsplash.com/photo-1769454682444-3bb07828f73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGJ1aWxkaW5nJTIwY29uc3RydWN0aW9uJTIwdmludGFnZXxlbnwxfHx8fDE3NzAxMjUzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alignment: 'right',
  },
  {
    year: '1984',
    title: 'Community Pulse',
    description: '선교와 봉사의 지평을 넓히며, 세상의 빛과 소금이 되는 공동체로 거듭났습니다. 소외된 이들을 품는 사랑의 요람이 되었습니다.',
    image: 'https://images.unsplash.com/photo-1768321611052-970d36fd6571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29tbXVuaXR5JTIwcGVvcGxlJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MDEyNTMxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    alignment: 'left',
  },
  {
    year: '2005',
    title: 'New Horizons',
    description: '디지털 시대 속에서도 본질을 잃지 않고, 전 세계와 소통하는 열린 공동체로 나아갔습니다. 전통과 혁신이 조화를 이루는 시간이었습니다.',
    image: 'https://images.unsplash.com/photo-1741903736332-8f87836f88eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjB3aW5kb3clMjBzdW5saWdodHxlbnwxfHx8fDE3NzAxMjUzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alignment: 'right',
  },
  {
    year: '2024',
    title: 'A Living Heritage',
    description: '100년의 시간을 넘어, 우리의 사명은 변함없습니다. 과거의 유산을 품고 미래의 희망을 향해 나아가는 살아있는 역사가 되겠습니다.',
    image: 'https://images.unsplash.com/photo-1694878276633-dc6bcba7ee33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjaGFwZWwlMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMTI1MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alignment: 'center',
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const scrollTop = scrollContainerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      
      // 헤더 높이를 제외하고 타임라인 섹션의 스크롤 계산
      const headerHeight = windowHeight;
      const introHeight = windowHeight * 0.3; // 0.5에서 0.3으로 줄임
      const timelineStart = headerHeight + introHeight;
      
      if (scrollTop < timelineStart) {
        setActiveIndex(-1);
        setScrollProgress(0);
        return;
      }
      
      // 각 타임라인 아이템당 할당된 스크롤 높이 (마지막은 더 길게)
      const scrollPerItem = windowHeight * 1.5;
      const lastItemScrollHeight = windowHeight * 2.5; // 마지막 섹션은 더 길게
      const timelineScrollTop = scrollTop - timelineStart;
      
      // 마지막 섹션 이전까지의 총 높이
      const scrollBeforeLast = scrollPerItem * (timelineData.length - 1);
      
      let index, progress;
      
      if (timelineScrollTop < scrollBeforeLast) {
        // 마지막 섹션 이전
        index = Math.floor(timelineScrollTop / scrollPerItem);
        progress = (timelineScrollTop % scrollPerItem) / scrollPerItem;
      } else {
        // 마지막 섹션
        index = timelineData.length - 1;
        const lastSectionScroll = timelineScrollTop - scrollBeforeLast;
        progress = Math.min(lastSectionScroll / lastItemScrollHeight, 1);
      }
      
      setActiveIndex(Math.min(index, timelineData.length - 1));
      setScrollProgress(progress);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const currentItem = activeIndex >= 0 ? timelineData[activeIndex] : null;
  const nextItem = activeIndex >= 0 && activeIndex < timelineData.length - 1 ? timelineData[activeIndex + 1] : null;
  
  // 전환 애니메이션을 위한 opacity 계산 - 더 부드럽게 오버랩
  const transitionStart = 0.5; // 50% 지점부터 전환 시작 (더 일찍)
  const transitionDuration = 1 - transitionStart; // 0.5 구간 동안 전환
  
  const fadeOutOpacity = scrollProgress > transitionStart 
    ? Math.max(0, 1 - ((scrollProgress - transitionStart) / transitionDuration))
    : 1;
  const fadeInOpacity = scrollProgress > transitionStart
    ? Math.min(1, (scrollProgress - transitionStart) / transitionDuration)
    : 0;
  
  // 마지막 섹션에서 어둡게 처리되는 효과 (더 천천히)
  const isLastSection = activeIndex === timelineData.length - 1;
  const overlayStart = 0.4; // 40% 지점부터 오버레이 시작
  const darkOverlayOpacity = isLastSection && scrollProgress > overlayStart
    ? Math.min((scrollProgress - overlayStart) / (1 - overlayStart) * 0.85, 0.85)
    : 0;
  
  // 비디오 섹션이 위로 올라오는 효과
  const videoSectionOffset = isLastSection && scrollProgress > overlayStart
    ? Math.min((scrollProgress - overlayStart) / (1 - overlayStart) * 100, 100)
    : 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fcfcfc] dark:bg-[#0a0a0a]" style={{ fontFamily: '"Noto Sans KR", "Inter", sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-white uppercase tracking-[0.3em]" style={{ fontFamily: '"Cinzel", serif' }}>
          Centennial
        </div>
        <div className="hidden md:flex gap-8 text-white text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-[#c5a059] transition-colors">Heritage</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">Archive</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">Mission</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">Future</a>
        </div>
        <button 
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="material-icons">menu</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex items-center justify-center md:hidden">
          <div className="flex flex-col gap-8 text-white text-xl tracking-widest uppercase text-center">
            <a href="#" className="hover:text-[#c5a059] transition-colors" onClick={() => setMenuOpen(false)}>Heritage</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors" onClick={() => setMenuOpen(false)}>Archive</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors" onClick={() => setMenuOpen(false)}>Mission</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors" onClick={() => setMenuOpen(false)}>Future</a>
          </div>
        </div>
      )}

      {/* Scroll Container */}
      <div ref={scrollContainerRef} className="w-full h-full overflow-y-scroll">
        {/* Hero Section */}
        <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 opacity-60">
            <img
              src="https://images.unsplash.com/photo-1759417831863-e6d776fa85c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwc3RvbmUlMjBjYXRoZWRyYWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMTI1MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Historical cathedral"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          <div className="relative z-10 text-center px-4">
            <h2 className="text-[#c5a059] uppercase tracking-[0.3em] mb-4" style={{ fontFamily: '"Cinzel", serif' }}>
              Timeline Archive
            </h2>
            <h1 className="text-white italic mb-8 leading-tight" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
              Moments of<br />100 Years
            </h1>
            <div className="mt-12 animate-bounce">
              <span className="material-icons text-white/50 text-4xl">expand_more</span>
            </div>
          </div>
        </header>

        {/* Intro Section */}
        <section className="relative py-24 px-6 pb-64 bg-gradient-to-b from-[#fcfcfc] via-[#fcfcfc] to-black dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-black">
          <div className="max-w-4xl mx-auto text-center relative z-10 mb-32">
            <p className="text-[#c5a059] uppercase tracking-widest text-sm mb-6">Our Foundation</p>
            <h3 className="text-3xl md:text-4xl mb-8 text-gray-800 dark:text-gray-200" style={{ fontFamily: '"Playfair Display", serif' }}>
              시간의 흐름 속에 새겨진, 100년의 믿음.
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-light">
              침묵 끝에 모인 작은 불씨로부터 현재를 비추는 활기찬 공동체에 이르기까지,<br className="hidden md:block" />
              우리의 영적 여정을 정의하는 역사적 이정표를 살펴보세요.
            </p>
          </div>
          {/* Fade to dark effect */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        </section>

        {/* Scrollable Timeline Section */}
        <div 
          ref={containerRef} 
          style={{ 
            height: `${(timelineData.length - 1) * 150 + 250}vh` // 마지막 섹션은 250vh
          }} 
          className="relative"
        >
          {/* Fixed Content Display */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Current Item */}
            {currentItem && (
              <>
                {/* Current Background Image */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    opacity: fadeOutOpacity,
                    transition: 'opacity 0.3s ease-out'
                  }}
                >
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                    style={{ 
                      filter: activeIndex < 3 ? 'grayscale(1)' : 'grayscale(0.3)',
                      transform: `scale(${1.05 + scrollProgress * 0.05})`
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Next Background Image (for smooth transition) */}
                {nextItem && fadeInOpacity > 0 && (
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      opacity: fadeInOpacity,
                      transition: 'opacity 0.3s ease-out'
                    }}
                  >
                    <img
                      src={nextItem.image}
                      alt={nextItem.title}
                      className="w-full h-full object-cover"
                      style={{ 
                        filter: activeIndex + 1 < 3 ? 'grayscale(1)' : 'grayscale(0.3)',
                        transform: 'scale(1.05)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                )}

                {/* Current Content */}
                <div 
                  className="relative z-10 container mx-auto px-8"
                  style={{ 
                    opacity: fadeOutOpacity,
                    transform: `translateY(${scrollProgress > transitionStart ? (scrollProgress - transitionStart) * 50 : 0}px)`,
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                  }}
                >
                  {currentItem.alignment === 'center' ? (
                    <div className="text-center max-w-2xl mx-auto">
                      <span
                        className="text-[#c5a059] block mb-4 select-none opacity-90"
                        style={{
                          fontFamily: '"Cinzel", serif',
                          fontSize: 'clamp(5rem, 12vw, 12rem)',
                        }}
                      >
                        {currentItem.year}
                      </span>
                      <h4
                        className="text-white mb-6 italic"
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: 'clamp(2rem, 4vw, 4rem)',
                        }}
                      >
                        {currentItem.title}
                      </h4>
                      <p
                        className="text-gray-100 leading-relaxed font-light"
                        style={{
                          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        }}
                      >
                        {currentItem.description}
                      </p>
                      <button
                        className="mt-12 px-10 py-4 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
                        style={{
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        전체 기록 보기
                      </button>
                    </div>
                  ) : (
                    <div className={`grid md:grid-cols-2 gap-12 items-center ${currentItem.alignment === 'right' ? 'direction-rtl' : ''}`}>
                      <div className={`${currentItem.alignment === 'right' ? 'order-2 md:order-1 text-right ml-auto' : 'order-1'} max-w-md`}>
                        <h4
                          className="text-white mb-4 italic"
                          style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                          }}
                        >
                          {currentItem.title}
                        </h4>
                        <p
                          className="text-gray-200 leading-relaxed font-light"
                          style={{
                            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                          }}
                        >
                          {currentItem.description}
                        </p>
                        <div
                          className={`mt-8 h-[1px] w-24 bg-[#c5a059] ${currentItem.alignment === 'right' ? 'ml-auto' : ''}`}
                        />
                      </div>
                      <div className={`${currentItem.alignment === 'right' ? 'order-1 md:order-2 text-right' : 'order-2 text-left'}`}>
                        <span
                          className="text-[#c5a059] block mb-4 select-none opacity-80"
                          style={{
                            fontFamily: '"Cinzel", serif',
                            fontSize: 'clamp(5rem, 12vw, 12rem)',
                          }}
                        >
                          {currentItem.year}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Next Content (fade in) */}
                {nextItem && fadeInOpacity > 0 && (
                  <div 
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    style={{ 
                      opacity: fadeInOpacity,
                      transform: `translateY(${50 - fadeInOpacity * 50}px)`,
                      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                    }}
                  >
                    <div className="container mx-auto px-8">
                      {nextItem.alignment === 'center' ? (
                        <div className="text-center max-w-2xl mx-auto">
                          <span
                            className="text-[#c5a059] block mb-4 select-none opacity-90"
                            style={{
                              fontFamily: '"Cinzel", serif',
                              fontSize: 'clamp(5rem, 12vw, 12rem)',
                            }}
                          >
                            {nextItem.year}
                          </span>
                          <h4
                            className="text-white mb-6 italic"
                            style={{
                              fontFamily: '"Playfair Display", serif',
                              fontSize: 'clamp(2rem, 4vw, 4rem)',
                            }}
                          >
                            {nextItem.title}
                          </h4>
                          <p
                            className="text-gray-100 leading-relaxed font-light"
                            style={{
                              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            }}
                          >
                            {nextItem.description}
                          </p>
                          <button
                            className="mt-12 px-10 py-4 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
                            style={{
                              fontFamily: '"Cinzel", serif',
                            }}
                          >
                            전체 기록 보기
                          </button>
                        </div>
                      ) : (
                        <div className={`grid md:grid-cols-2 gap-12 items-center ${nextItem.alignment === 'right' ? 'direction-rtl' : ''}`}>
                          <div className={`${nextItem.alignment === 'right' ? 'order-2 md:order-1 text-right ml-auto' : 'order-1'} max-w-md`}>
                            <h4
                              className="text-white mb-4 italic"
                              style={{
                                fontFamily: '"Playfair Display", serif',
                                fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                              }}
                            >
                              {nextItem.title}
                            </h4>
                            <p
                              className="text-gray-200 leading-relaxed font-light"
                              style={{
                                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                              }}
                            >
                              {nextItem.description}
                            </p>
                            <div
                              className={`mt-8 h-[1px] w-24 bg-[#c5a059] ${nextItem.alignment === 'right' ? 'ml-auto' : ''}`}
                            />
                          </div>
                          <div className={`${nextItem.alignment === 'right' ? 'order-1 md:order-2 text-right' : 'order-2 text-left'}`}>
                            <span
                              className="text-[#c5a059] block mb-4 select-none opacity-80"
                              style={{
                                fontFamily: '"Cinzel", serif',
                                fontSize: 'clamp(5rem, 12vw, 12rem)',
                              }}
                            >
                              {nextItem.year}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Dark Overlay for Last Section Transition */}
                {isLastSection && (
                  <div 
                    className="absolute inset-0 z-20 bg-black pointer-events-none"
                    style={{ 
                      opacity: darkOverlayOpacity,
                      transition: 'opacity 0.3s ease-out'
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Video Section - slides up over timeline */}
        <section 
          className="relative bg-white dark:bg-[#0d0d0d] py-24 px-6"
          style={{
            zIndex: 30,
            marginTop: `-${100 - videoSectionOffset}vh`,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-[#c5a059] text-xs tracking-widest uppercase mb-2">100주년 기념 영상 시리즈</p>
              <h3 className="text-4xl text-gray-900 dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                세기의 목소리
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { episode: '01', title: '첫 번째 비전가', img: 'https://images.unsplash.com/photo-1762777125835-fb9833fb931e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800' },
                { episode: '02', title: '위대한 모임', img: 'https://images.unsplash.com/photo-1768321611052-970d36fd6571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800' },
                { episode: '03', title: '섬김의 손길', img: 'https://images.unsplash.com/photo-1769454682444-3bb07828f73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800' },
                { episode: '04', title: '다음 100년', img: 'https://images.unsplash.com/photo-1694878276633-dc6bcba7ee33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800' },
              ].map((video) => (
                <div key={video.episode} className="group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden rounded-xl mb-4 bg-gray-200 dark:bg-gray-800">
                    <img
                      src={video.img}
                      alt={video.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 rounded-full p-2 flex items-center justify-center">
                      <span className="material-icons text-[#030213] dark:text-[#c5a059]">play_arrow</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter">
                    Episode {video.episode}.
                  </p>
                  <h5
                    className="text-lg text-gray-800 dark:text-gray-200 group-hover:text-[#c5a059] transition-colors"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {video.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] dark:bg-black text-white py-20 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-[#c5a059] uppercase tracking-widest mb-6" style={{ fontFamily: '"Cinzel", serif', fontSize: '1.5rem' }}>
                Centennial
              </h2>
              <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                100년의 믿음과 소망, 그리고 사랑을 기념합니다. 1924년에 설립되어, 우리는 함께 다음 세기를 향해 나아갑니다.
              </p>
            </div>
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-[#c5a059] mb-6">Archive</h6>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">역사 자료</a></li>
                <li><a href="#" className="hover:text-white transition-colors">사진 갤러리</a></li>
                <li><a href="#" className="hover:text-white transition-colors">구술 기록</a></li>
                <li><a href="#" className="hover:text-white transition-colors">연혁</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-[#c5a059] mb-6">Connect</h6>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#c5a059] hover:border-[#c5a059] transition-all duration-300">
                  <span className="material-icons text-sm">public</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#c5a059] hover:border-[#c5a059] transition-all duration-300">
                  <span className="material-icons text-sm">email</span>
                </a>
              </div>
              <p className="text-xs text-gray-500">
                © 2024 Centennial Church Heritage Society.<br />All rights reserved.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-widest text-gray-500">
            <div className="flex gap-8 mb-4 md:mb-0">
              <a href="#" className="hover:text-white">개인정보 처리방침</a>
              <a href="#" className="hover:text-white">이용약관</a>
              <a href="#" className="hover:text-white">쿠키 설정</a>
            </div>
            <p>Designed with faith and precision.</p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}