// ========================================
// قائمة الفيديوهات
// ========================================

const videoList = [

    {
        id: "video1",
        src: "videos/حسن التقسيم.mp4",
        title: "حسن التقسيم ما لم تسمعه من قبل"
    },

    {
        id: "video2",
        src: "videos/كل حاجه تاخد وقتها.mp4",
        title: "الصبر كل حاجه بتأخد وقتها"
    },

    {
        id: "video3",
        src: "videos/محمد صلاح core.mp4",
        title: "مستر محمد صلاح core"
    },

    {
        id: "video4",
        src: "videos/البلاغه سهله.mp4",
        title: "البلاغه اسهل ما يمكن"
    }

];


// ========================================
// Shuffle
// ========================================

// لو عايز الفيديوهات عشوائية
// سيب السطر ده شغال

videoList.sort(() => Math.random() - 0.5);


// ========================================
// عناصر الصفحة
// ========================================

const videosContainer =
    document.querySelector(".videos");

const upButton =
    document.getElementById("up");

const downButton =
    document.getElementById("down");

const searchInput =
    document.getElementById("search");


// ========================================
// معرفة هل الصفحة شورتس
// ========================================

const isShortsPage =
    upButton !== null &&
    downButton !== null;


// ========================================
// إنشاء الفيديوهات
// ========================================

if (videosContainer) {

    // مسح المحتوى القديم

    videosContainer.innerHTML = "";


    videoList.forEach(function (item) {

        // ========================================
        // إنشاء Section
        // ========================================

        const section =
            document.createElement("section");

        section.className = "video";


        // تخزين ID

        section.dataset.id = item.id;


        // ========================================
        // إنشاء الفيديو
        // ========================================

        const video =
            document.createElement("video");


        // في الهوم بدون Controls
        // في الشورتس Controls

        video.controls =
            isShortsPage;


        video.loop = true;

        video.playsInline = true;


        // إخفاء Picture in Picture

        video.setAttribute(
            "disablepictureinpicture",
            ""
        );


        // ========================================
        // Source
        // ========================================

        const source =
            document.createElement("source");

        source.src = item.src;

        source.type = "video/mp4";

        video.appendChild(source);


        // ========================================
        // معلومات الفيديو
        // ========================================

        const info =
            document.createElement("div");

        info.className =
            "video-info";


        // ========================================
        // عنوان الفيديو
        // ========================================

        const title =
            document.createElement("h3");

        title.className =
            "video-title";

        title.textContent =
            item.title;


        info.appendChild(title);


        // ========================================
        // إضافة العناصر
        // ========================================

        section.appendChild(video);

        section.appendChild(info);

        videosContainer.appendChild(section);


        // ========================================
        // الهوم
        // ========================================

        if (!isShortsPage) {

            section.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "mo.html?video=" +
                        encodeURIComponent(item.id);

                }
            );

        }

    });

}


// ========================================
// الشورتس
// ========================================

if (isShortsPage) {

    const videoBoxes =
        document.querySelectorAll(".video");

    const videoElements =
        document.querySelectorAll(
            ".video video"
        );


    // ========================================
    // قراءة ID من الرابط
    // ========================================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const selectedId =
        params.get("video");


    // ========================================
    // معرفة الفيديو المطلوب
    // ========================================

    let currentVideo =
        videoList.findIndex(
            function (item) {

                return item.id === selectedId;

            }
        );


    // لو مفيش فيديو محدد

    if (currentVideo === -1) {

        currentVideo = 0;

    }


    // ========================================
    // تشغيل فيديو جديد
    // ========================================

    function switchVideo(index) {

        if (
            index < 0 ||
            index >= videoElements.length
        ) {

            return;

        }


        currentVideo = index;


        videoElements.forEach(
            function (video, i) {

                if (i === currentVideo) {

                    // تشغيل الفيديو الجديد

                    video.currentTime = 0;

                    video.play()
                        .catch(function () {});

                }

                else {

                    // إيقاف باقي الفيديوهات

                    video.pause();

                }

            }
        );

    }


    // ========================================
    // زر النزول
    // ========================================

    downButton.addEventListener(
        "click",
        function () {

            if (
                currentVideo <
                videoBoxes.length - 1
            ) {

                const nextVideo =
                    currentVideo + 1;


                videoBoxes[nextVideo]
                    .scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

            }

        }
    );


    // ========================================
    // زر الطلوع
    // ========================================

    upButton.addEventListener(
        "click",
        function () {

            if (currentVideo > 0) {

                const previousVideo =
                    currentVideo - 1;


                videoBoxes[previousVideo]
                    .scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

            }

        }
    );


    // ========================================
    // السحب بين الفيديوهات
    // ========================================

    let scrollTimeout;


    videosContainer.addEventListener(
        "scroll",
        function () {

            clearTimeout(scrollTimeout);


            scrollTimeout =
                setTimeout(
                    function () {

                        const videoHeight =
                            videosContainer
                                .clientHeight;


                        if (videoHeight <= 0) {

                            return;

                        }


                        const newVideo =
                            Math.round(
                                videosContainer
                                    .scrollTop /
                                videoHeight
                            );


                        if (
                            newVideo !==
                            currentVideo
                        ) {

                            if (
                                newVideo >= 0 &&
                                newVideo <
                                videoElements.length
                            ) {

                                switchVideo(
                                    newVideo
                                );

                            }

                        }

                    },
                    150
                );

        }
    );


    // ========================================
    // لو المستخدم شغل فيديو
    // نوقف باقي الفيديوهات
    // ========================================

    videoElements.forEach(
        function (video) {

            video.addEventListener(
                "play",
                function () {

                    videoElements.forEach(
                        function (otherVideo) {

                            if (
                                otherVideo !==
                                video
                            ) {

                                otherVideo.pause();

                            }

                        }
                    );

                }
            );


            // ====================================
            // مهم:
            // لما المستخدم يعمل Pause
            // الجافا لا تعمل Play
            // ====================================

            video.addEventListener(
                "pause",
                function () {

                    // لا نفعل أي شيء

                }
            );

        }
    );


    // ========================================
    // فتح الفيديو المطلوب
    // ========================================

    videoBoxes[currentVideo]
        .scrollIntoView({

            behavior: "instant",

            block: "start"

        });


    // ========================================
    // تشغيل الفيديو المختار أول مرة فقط
    // ========================================

    videoElements[currentVideo]
        .play()
        .catch(function () {});

}


// ========================================
// 🔥 البحث القوي
// ========================================

function normalizeText(text) {

    return text

        .toLowerCase()

        // إزالة التشكيل

        .normalize("NFD")

        .replace(
            /[\u064B-\u065F\u0670]/g,
            ""
        )

        // أ / إ / آ / ٱ → ا

        .replace(
            /[إأآٱ]/g,
            "ا"
        )

        // ؤ → و

        .replace(
            /ؤ/g,
            "و"
        )

        // ئ → ي

        .replace(
            /ئ/g,
            "ي"
        )

        // ة → ه

        .replace(
            /ة/g,
            "ه"
        )

        // ى → ي

        .replace(
            /ى/g,
            "ي"
        )

        // إزالة التطويل

        .replace(
            /ـ/g,
            ""
        )

        // توحيد المسافات

        .replace(
            /\s+/g,
            " "
        )

        .trim();

}


// ========================================
// البحث
// ========================================

if (
    searchInput &&
    videosContainer
) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                normalizeText(
                    searchInput.value
                );


            const sections =
                videosContainer
                    .querySelectorAll(
                        ".video"
                    );


            // ====================================
            // البحث فاضي
            // ====================================

            if (
                searchText === ""
            ) {

                sections.forEach(
                    function (section) {

                        section.style.display =
                            "";

                    }
                );

                return;

            }


            // ====================================
            // كلمات البحث
            // ====================================

            const searchWords =
                searchText
                    .split(" ")
                    .filter(
                        function (word) {

                            return word.length > 0;

                        }
                    );


            // ====================================
            // البحث داخل الفيديوهات
            // ====================================

            sections.forEach(
                function (section) {

                    const id =
                        section.dataset.id;


                    const videoData =
                        videoList.find(
                            function (item) {

                                return item.id === id;

                            }
                        );


                    if (!videoData) {

                        return;

                    }


                    // ====================================
                    // تجهيز العنوان
                    // ====================================

                    const title =
                        normalizeText(
                            videoData.title
                        );


                    // ====================================
                    // هل الكلمات موجودة؟
                    // ====================================

                    const found =
                        searchWords.every(
                            function (word) {

                                return title.includes(
                                    word
                                );

                            }
                        );


                    // ====================================
                    // إظهار / إخفاء
                    // ====================================

                    if (found) {

                        section.style.display =
                            "";

                    }

                    else {

                        section.style.display =
                            "none";

                    }

                }
            );

        }
    );

}