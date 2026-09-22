export type AwardPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type AwardAlbum = {
  /** ปีที่แสดงบนป้ายรางวัลใน Hero */
  year: string;
  /** ข้อความบนป้าย — ต้องตรงกับที่ Hero แสดง */
  badge: string;
  /** ชื่องานตามที่ปรากฏบนฉากในภาพ */
  event: string;
  /** รางวัลตามที่สลักบนถ้วย / ขึ้นบนจอในงาน */
  award: string;
  photos: AwardPhoto[];
};

export const awardAlbums: AwardAlbum[] = [
  {
    year: "2025",
    badge: "Provident Fund Of the Year 2025",
    event: "AIA Annual Agency Awards Presentation 2025",
    award: "Provident Fund Top Producer Of The Year 2025 — 1st Runner Up",
    photos: [
      {
        src: "/awards/2025-04.jpg",
        width: 1567,
        height: 1045,
        alt: "ถ่ายภาพหมู่บนเวทีงาน AIA Annual Agency Awards Presentation 2025",
      },
      {
        src: "/awards/2025-02.jpg",
        width: 1045,
        height: 1567,
        alt: "ชูถ้วยรางวัล Provident Fund Top Producer Of The Year 2025 หน้าฉาก AIA",
      },
      {
        src: "/awards/2025-03.jpg",
        width: 1045,
        height: 1567,
        alt: "ถ้วยรางวัลสลักข้อความ Provident Fund Top Producer Of The Year 2025 — 1st Runner Up",
      },
      {
        src: "/awards/2025-01.jpg",
        width: 1567,
        height: 1045,
        alt: "ทีมงานร่วมแสดงความยินดีในงานประกาศรางวัลประจำปี 2025",
      },
      {
        src: "/awards/2025-05.jpg",
        width: 1477,
        height: 1108,
        alt: "บนเวทีงาน AIA Annual Agency Awards Presentation 2025",
      },
    ],
  },
  {
    year: "2022",
    badge: "Provident Fund Of the Year 2022",
    event: "AIA Annual Agency Awards Presentation 2020 & 2021",
    award: "Provident Fund Top Producer Awards Of The Year 2021",
    photos: [
      {
        src: "/awards/2022-08.jpg",
        width: 1044,
        height: 1567,
        alt: "ขึ้นรับรางวัล Provident Fund Top Producer Awards Of The Year 2021 บนเวที",
      },
      {
        src: "/awards/2022-09.jpg",
        width: 1567,
        height: 1044,
        alt: "รับมอบถ้วยรางวัล Provident Fund Top Producer Awards Of The Year 2021 บนเวที",
      },
      {
        src: "/awards/2022-12.jpg",
        width: 1567,
        height: 1044,
        alt: "ทีมงานถือถ้วยรางวัลร่วมกันบนเวทีงานประกาศรางวัล",
      },
      {
        src: "/awards/2022-07.jpg",
        width: 1044,
        height: 1567,
        alt: "ถือถ้วยรางวัลหน้าฉากงาน AIA Annual Agency Awards Presentation 2020 & 2021",
      },
      {
        src: "/awards/2022-06.jpg",
        width: 1044,
        height: 1567,
        alt: "รับถ้วยรางวัลหน้าฉากงาน AIA Annual Agency Awards Presentation 2020 & 2021",
      },
      {
        src: "/awards/2022-05.jpg",
        width: 1567,
        height: 1044,
        alt: "ชูถ้วยรางวัลร่วมกันหน้าฉากงานประกาศรางวัล",
      },
      {
        src: "/awards/2022-04.jpg",
        width: 1567,
        height: 1044,
        alt: "ถ่ายภาพหน้าฉากงาน AIA Annual Agency Awards Presentation 2020 & 2021",
      },
      {
        src: "/awards/2022-11.jpg",
        width: 1044,
        height: 1567,
        alt: "ถือถ้วยรางวัลบนเวทีงานประกาศรางวัล",
      },
      {
        src: "/awards/2022-10.jpg",
        width: 1044,
        height: 1567,
        alt: "ถ่ายภาพบนเวทีงานประกาศรางวัล",
      },
      {
        src: "/awards/2022-03.jpg",
        width: 1044,
        height: 1567,
        alt: "ทีมงานถ่ายภาพร่วมกันในงานประกาศรางวัล",
      },
      {
        src: "/awards/2022-01.jpg",
        width: 1567,
        height: 1044,
        alt: "บรรยากาศในงานประกาศรางวัลประจำปี",
      },
      {
        src: "/awards/2022-02.jpg",
        width: 1044,
        height: 1567,
        alt: "ฉากงาน AIA Annual Agency Awards Presentation 2020 & 2021 ที่ทรู ไอคอน ฮอลล์",
      },
    ],
  },
];
