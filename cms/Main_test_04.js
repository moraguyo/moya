document.addEventListener('DOMContentLoaded', () => {
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

    const timelineScrollContainer = document.getElementById('timeline-scroll-container');
    const contentContainer = document.getElementById('content-container');
    const currentBgImg = document.getElementById('current-bg-img');
    const nextBgImg = document.getElementById('next-bg-img');
    const bgLayerCurrent = document.getElementById('bg-layer-current');
    const bgLayerNext = document.getElementById('bg-layer-next');
    const darkOverlay = document.getElementById('dark-overlay');
    const videoSection = document.getElementById('video-section');

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Setup timeline container height
    timelineScrollContainer.style.height = `${(timelineData.length) * 100 + 100}vh`;

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.style.display === 'none';
            mobileMenu.style.display = isHidden ? 'flex' : 'none';
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
            });
        });
    }

    const renderContent = (index, opacity, translateY) => {
        const item = timelineData[index];
        if (!item) return '';

        if (item.alignment === 'center') {
            return `
                <div class="timeline-item-content text-center max-w-4xl mx-auto" style="opacity: ${opacity}; transform: translateY(${translateY}px);">
                    <span class="text-gold block mb-4 font-cinzel year-display animate-fade-in">${item.year}</span>
                    <h4 class="text-white mb-6 italic font-playfair item-title">${item.title}</h4>
                    <p class="text-gray-100 leading-relaxed font-light item-desc max-w-2xl mx-auto">${item.description}</p>
                    <button class="mt-12 px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-cinzel">전체 기록 보기</button>
                </div>
            `;
        } else {
            const isRight = item.alignment === 'right';
            return `
                <div class="timeline-item-content grid lg:grid-cols-12 gap-12 items-center w-full" style="opacity: ${opacity}; transform: translateY(${translateY}px);">
                    <div class="lg:col-span-4 ${isRight ? 'lg:order-2' : 'lg:order-1'} space-y-8">
                        <span class="text-gold tracking-[0.2em] font-medium uppercase text-sm block">Milestone</span>
                        <h4 class="text-white italic font-playfair item-title">${item.title}</h4>
                        <p class="text-gray-200 leading-relaxed font-light item-desc">${item.description}</p>
                        <div class="w-24 h-[1px] bg-gold/30"></div>
                    </div>
                    <div class="lg:col-span-8 ${isRight ? 'lg:order-1' : 'lg:order-2'} relative">
                         <span class="text-gold block mb-4 font-cinzel year-display tabular-nums ${isRight ? 'text-left' : 'text-right'}">${item.year}</span>
                    </div>
                </div>
            `;
        }
    };

    const handleScroll = () => {
        const rect = timelineScrollContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress within the timeline container
        // progress goes from 0 to 1 as the container scrolls through the viewport
        const totalScrollable = rect.height - windowHeight;
        const currentScroll = -rect.top;
        const totalProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

        if (rect.top > windowHeight || rect.bottom < 0) {
            return; // Not in view
        }

        const itemsCount = timelineData.length;
        const progressPerItem = 1 / itemsCount;

        let index = Math.floor(totalProgress / progressPerItem);
        index = Math.min(index, itemsCount - 1);

        const itemProgress = (totalProgress % progressPerItem) / progressPerItem;

        const currentItem = timelineData[index];
        const nextItem = index < itemsCount - 1 ? timelineData[index + 1] : null;

        const transitionStart = 0.7;
        const transitionDuration = 1 - transitionStart;

        const fadeOutOpacity = itemProgress > transitionStart
            ? Math.max(0, 1 - ((itemProgress - transitionStart) / transitionDuration))
            : 1;
        const fadeInOpacity = itemProgress > transitionStart
            ? Math.min(1, (itemProgress - transitionStart) / transitionDuration)
            : 0;

        // Background handling
        bgLayerCurrent.style.opacity = fadeOutOpacity;
        if (currentBgImg.src !== currentItem.image) {
            currentBgImg.src = currentItem.image;
        }
        currentBgImg.style.transform = `scale(${1.05 + itemProgress * 0.05})`;

        if (nextItem && fadeInOpacity > 0) {
            bgLayerNext.style.opacity = fadeInOpacity;
            if (nextBgImg.src !== nextItem.image) {
                nextBgImg.src = nextItem.image;
            }
            nextBgImg.style.transform = `scale(${1.0 + (1 - fadeInOpacity) * 0.05})`;
        } else {
            bgLayerNext.style.opacity = 0;
        }

        // Content handling
        const currentTranslateY = itemProgress > transitionStart ? (itemProgress - transitionStart) * -50 : 0;
        let htmlContent = renderContent(index, fadeOutOpacity, currentTranslateY);

        if (nextItem && fadeInOpacity > 0) {
            const nextTranslateY = 50 - (fadeInOpacity * 50);
            htmlContent += `
                <div class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div class="container mx-auto px-8">
                        ${renderContent(index + 1, fadeInOpacity, nextTranslateY)}
                    </div>
                </div>
            `;
        }
        contentContainer.innerHTML = htmlContent;

        // Last section dark overlay and video slide up
        const isLastSection = index === itemsCount - 1;
        const overlayStart = 0.5;
        if (isLastSection && itemProgress > overlayStart) {
            const darkOpacity = Math.min((itemProgress - overlayStart) / (1 - overlayStart) * 0.9, 0.9);
            darkOverlay.style.opacity = darkOpacity;

            // Video section slide up effect
            const videoProgress = (itemProgress - overlayStart) / (1 - overlayStart);
            videoSection.style.transform = `translateY(${(1 - videoProgress) * 100}px)`;
            videoSection.style.opacity = videoProgress;
        } else if (isLastSection) {
             darkOverlay.style.opacity = 0;
             videoSection.style.opacity = 0;
        } else {
            darkOverlay.style.opacity = 0;
            videoSection.style.opacity = 0;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
