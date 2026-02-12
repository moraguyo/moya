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

    const timelineContainer = document.getElementById('timeline-scroll-container');
    const contentContainer = document.getElementById('content-container');
    const currentBgImg = document.getElementById('current-bg-img');
    const nextBgImg = document.getElementById('next-bg-img');
    const bgLayerCurrent = document.getElementById('bg-layer-current');
    const bgLayerNext = document.getElementById('bg-layer-next');
    const darkOverlay = document.getElementById('dark-overlay');
    const videoSection = document.getElementById('video-section');

    // Calculate heights based on React logic
    // (timelineData.length - 1) * 150vh + 250vh
    const totalTimelineHeight = (timelineData.length - 1) * 150 + 250;
    timelineContainer.style.height = `${totalTimelineHeight}vh`;

    const renderItemHTML = (index, opacity, translateY) => {
        const item = timelineData[index];
        if (!item) return '';

        if (item.alignment === 'center') {
            return `
                <div class="timeline-item flex-center" style="opacity: ${opacity}; transform: translateY(${translateY}px);">
                    <div style="max-width: 42rem; margin: 0 auto;">
                        <span class="year-display">${item.year}</span>
                        <h4 class="item-title">${item.title}</h4>
                        <p class="item-desc">${item.description}</p>
                        <button class="view-archive-btn">전체 기록 보기</button>
                    </div>
                </div>
            `;
        } else {
            const isRight = item.alignment === 'right';
            return `
                <div class="timeline-item grid-2-col ${isRight ? 'rtl-layout' : ''}" style="opacity: ${opacity}; transform: translateY(${translateY}px);">
                    <div class="${isRight ? 'text-right' : ''}" style="max-width: 28rem;">
                        <h4 class="item-title">${item.title}</h4>
                        <p class="item-desc">${item.description}</p>
                        <div class="accent-line ${isRight ? 'ml-auto' : ''}"></div>
                    </div>
                    <div class="${isRight ? 'text-right' : 'text-left'}">
                         <span class="year-display">${item.year}</span>
                    </div>
                </div>
            `;
        }
    };

    const handleScroll = () => {
        const rect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // When timeline hits the top, relativeScroll starts at 0
        const scrollTop = -rect.top;
        if (scrollTop < 0) return;

        // Total scrollable distance within the timeline section
        const totalScrollable = rect.height - windowHeight;
        const timelineScrollTop = Math.min(Math.max(scrollTop, 0), totalScrollable);

        const scrollPerItem = windowHeight * 1.5;
        const lastItemScrollHeight = windowHeight * 2.5;
        const scrollBeforeLast = scrollPerItem * (timelineData.length - 1);

        let activeIndex, scrollProgress;

        if (timelineScrollTop < scrollBeforeLast) {
            activeIndex = Math.floor(timelineScrollTop / scrollPerItem);
            scrollProgress = (timelineScrollTop % scrollPerItem) / scrollPerItem;
        } else {
            activeIndex = timelineData.length - 1;
            const lastSectionScroll = timelineScrollTop - scrollBeforeLast;
            scrollProgress = Math.min(lastSectionScroll / lastItemScrollHeight, 1);
        }

        const transitionStart = 0.5;
        const transitionDuration = 1 - transitionStart;

        const fadeOutOpacity = scrollProgress > transitionStart
            ? Math.max(0, 1 - ((scrollProgress - transitionStart) / transitionDuration))
            : 1;
        const fadeInOpacity = scrollProgress > transitionStart
            ? Math.min(1, (scrollProgress - transitionStart) / transitionDuration)
            : 0;

        const currentItem = timelineData[activeIndex];
        const nextItem = (activeIndex < timelineData.length - 1) ? timelineData[activeIndex + 1] : null;

        // Background logic
        bgLayerCurrent.style.opacity = fadeOutOpacity;
        if (currentBgImg.src !== currentItem.image) {
            currentBgImg.src = currentItem.image;
        }
        // Grayscale logic from React
        currentBgImg.style.filter = activeIndex < 3 ? 'grayscale(1)' : 'grayscale(0.3)';
        currentBgImg.style.transform = `scale(${1.05 + scrollProgress * 0.05})`;

        if (nextItem && fadeInOpacity > 0) {
            bgLayerNext.style.opacity = fadeInOpacity;
            if (nextBgImg.src !== nextItem.image) {
                nextBgImg.src = nextItem.image;
            }
            nextBgImg.style.filter = (activeIndex + 1) < 3 ? 'grayscale(1)' : 'grayscale(0.3)';
            nextBgImg.style.transform = `scale(1.05)`;
        } else {
            bgLayerNext.style.opacity = 0;
        }

        // Content logic
        const currentTranslateY = scrollProgress > transitionStart ? (scrollProgress - transitionStart) * 50 : 0;
        let htmlContent = renderItemHTML(activeIndex, fadeOutOpacity, currentTranslateY);

        if (nextItem && fadeInOpacity > 0) {
            const nextTranslateY = 50 - (fadeInOpacity * 50);
            htmlContent += `
                <div style="position: absolute; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    ${renderItemHTML(activeIndex + 1, fadeInOpacity, nextTranslateY)}
                </div>
            `;
        }
        contentContainer.innerHTML = htmlContent;

        // Video section slide up logic
        const isLastSection = activeIndex === timelineData.length - 1;
        const overlayStart = 0.4;
        if (isLastSection && scrollProgress > overlayStart) {
            const ratio = (scrollProgress - overlayStart) / (1 - overlayStart);
            const darkOpacity = Math.min(ratio * 0.85, 0.85);
            darkOverlay.style.opacity = darkOpacity;

            const videoOffset = ratio * 100; // 0 to 100
            videoSection.style.marginTop = `-${videoOffset}vh`;
        } else {
            darkOverlay.style.opacity = 0;
            videoSection.style.marginTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
