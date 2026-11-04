// ============================================================================
// MODULE 6: SCENE CONTROLLER, DIRECT YAKSHA CAMERA JUMP, 3-SEASON ATTIRE & EXPORT
// ============================================================================

window.WPKApp = (function () {
  const { allMaterials, envMap } = window.WPKTextures;
  const { buildPhraUbosot } = window.WPKMainUbosot;
  const { buildUpperTerrace } = window.WPKTerrace;
  const { buildPrecinctAndSurroundings } = window.WPKPrecinct;

  const SEASON_DESCRIPTIONS = {
    summer: {
      title: 'องค์พระแก้วมรกต: เครื่องทรงฤดูร้อน (ทรงเครื่องต้นอย่างพระมหากษัตริย์)',
      badge: '☀️ เครื่องทรงฤดูร้อน (เพชร-ทับทิม)',
      style: 'ทองคำลงยาฝังเพชร ทับทิม และมรกต',
      desc: 'เครื่องทรงฤดูร้อน: ทรงพระศิราภรณ์มงกุฎยอดชัย 7 ชั้นฝังเพชรและทับทิม กระบังหน้าประดับเพชรเรียงเม็ด กรรเจียกจอน 2 ชั้น กุณฑลระย้า 3 ชั้น กรองศอทองคำลงยา 3 ชั้น อินธนูงอนเชิด 3 ชั้น สังวาลเพชรพาดไขว้ 2 สาย ทับทรวงดารา 8 แฉกฝังทับทิม พาหุรัดยอดกนก ทองพระกร รัดพระองค์ปั้นเหน่งเพชร ชายไหว-ชายแครง และสุวรรณกระถอบ 2 ชั้น'
    },
    rainy: {
      title: 'องค์พระแก้วมรกต: เครื่องทรงฤดูฝน (ห่มเฉียงเปิดพระอังสาขวา)',
      badge: '🌧️ เครื่องทรงฤดูฝน (พระศกน้ำเงิน)',
      style: 'พระศกทองคำลงยาสีน้ำเงิน & จีวรทองดุนลาย',
      desc: 'เครื่องทรงฤดูฝน: ทรงพระศกทองคำลงยาสีน้ำเงินไพลินประดับเม็ดพระศกขมวดก้นหอย 3D เรียง 4 ชั้น ขอบไรพระศกฝังเพชรและทับทิม พระรัศมีเพชร ห่มจีวรทองคำดุนลายพุ่มข้าวบิณฑ์ฝังอัญมณีแบบห่มเฉียงเปิดพระอังสาขวาและพระพาหาขวาให้เห็นเนื้อหยกสีเขียวมรกตใส พาดทับด้วยสังฆาฏิทองคำฝังทับทิมและเพชรเรียงเม็ดบนพระอังสาซ้าย'
    },
    winter: {
      title: 'องค์พระแก้วมรกต: เครื่องทรงฤดูหนาว (ผ้าคลุมทองคำถักลายตาข่ายดอกพิกุล)',
      badge: '❄️ เครื่องทรงฤดูหนาว (ผ้าคลุมทองถัก)',
      style: 'ผ้าคลุมหลอดทองคำลงยาถักตาข่ายดอกพิกุล',
      desc: 'เครื่องทรงฤดูหนาว: ทรงพระศกทองคำลงยาสีน้ำเงินไพลินประดับเพชรและยอดรัศมีเพชร ห่มผ้าคลุมไหล่ทองคำถักร้อยด้วยหลอดทองคำลงยาลายตาข่ายดอกพิกุลประดับเพชร ทับทิม และมรกต คลุมทั้งสองพระอังสา มีชายครุยทองคำห้อยระย้ารอบขอบล่าง 24 พู่ และเข็มกลัดทับทรวงดอกไม้เพชร-ทับทิม 4 ดอกเรียงกลางพระอุระ'
    }
  };

  const LANDMARKS = [
    {
      id: 'yaksha_green_white',
      name: 'ยักษ์ทวารบาลคู่: ทศกัณฐ์ (กายเขียว) & สหัสเดชะ (กายขาว)',
      shortName: '👹 ทศกัณฐ์ (เขียว) & สหัสเดชะ (ขาว)',
      badge: 'ชฎาพักตร์ซ้อน 2 ชั้น (หันหน้าตรง)',
      style: 'ปูนปั้นประดับกระเบื้องเคลือบเบญจรงค์ 512px',
      zone: 'หน้าซุ้มประตูพระระเบียงคดฝั่งลานวัด',
      pos: [-30.9, 8.2, 1.5],
      camPos: [-19.8, 4.8, 1.5],
      camTarget: [-31.2, 5.6, 1.5],
      cutaway: false,
      desc: 'มุมมองด้านหน้าตรงของยักษ์ทวารบาลคู่: ฝั่งซ้ายคือ "ทศกัณฐ์" (กายสีเขียวมรกต) และฝั่งขวาคือ "สหัสเดชะ" (กายสีขาวบริสุทธิ์) มีรายละเอียดพักตร์ซ้อนชั้นที่ 2 บนยอดชฎา คิ้วขมวดเป็นลอน เขี้ยวโง้งสีขาวคู่ใหญ่ หนวดขอบทอง-แดง สายสังวาลเกราะอกเรียบ ทองพระกรซ้อนที่ข้อมือ แหวนทองที่นิ้วกุมกระบอง และซุ้มประตูพระระเบียงคดเปิดช่องทางเดินทะลุ'
    },
    {
      id: 'yaksha_gate',
      name: 'ยักษ์ทวารบาลคู่ความละเอียดสูง: สุริยาภพ (แดง) & อินทรชิต (เขียว)',
      shortName: '👹 สุริยาภพ (แดง) & อินทรชิต (เขียว)',
      badge: 'ทวารบาลพระระเบียงคด (ทิศเหนือ)',
      style: 'เกราะกระเบื้องเบญจรงค์ 512px & ชฎาพักตร์ซ้อน',
      zone: 'ซุ้มประตูพระระเบียงคดทิศเหนือ',
      pos: [0, 8.5, -48],
      camPos: [0, 5.0, -54.8],
      camTarget: [0, 6.0, -41.0],
      cutaway: false,
      desc: 'ยักษ์ทวารบาลคู่หน้าซุ้มประตูพระระเบียงคดทิศเหนือ: ฝั่งซ้ายคือ "สุริยาภพ" (กายสีแดงชาด) และฝั่งขวาคือ "อินทรชิต" (กายสีเขียวมรกต) มีรายละเอียดคิ้วขมวดเป็นลอน ตาโพลงกลมโตขอบตาทอง จมูกชมพู่ หนวดลายกนก ซี่ฟันขาวเรียงซี่ เขี้ยวโง้งคู่ใหญ่ ชฎาพักตร์ซ้อน 4 หน้า สายสังวาลเกราะอกเรียบ อินธนู 2 ชั้น สุวรรณกระถอบ 2 ชั้น กำไลข้อเท้า 3 วง และรองเท้าเชิงงอน'
    },
    {
      id: 'emerald_buddha_closeup',
      name: 'พระพักตร์ & เครื่องทรง 3 ฤดูประดับเพชร-ทับทิม องค์พระแก้วมรกต',
      shortName: '🔍 พระพักตร์องค์พระแก้วมรกต',
      badge: 'องค์ประธานสูงสุด (สลับได้ 3 ฤดู)',
      style: 'หยกมรกตแกะสลัก & เครื่องทรงทองคำฝังเพชร',
      zone: 'เหนือพระบุษบกทองคำ',
      pos: [0, 10.2, 14.2],
      camPos: [0, 7.0, 18.2],
      camTarget: [0, 9.5, 14.2],
      cutaway: true,
      desc: 'องค์พระพุทธมหามณีรัตนปฏิมากรความละเอียดสูงสุด: ปั้นสัดส่วนพระวรกายเรียบสง่างามด้วย Lathe Geometry ปล้องพระศอ 3 ชั้น พระพักตร์มีเปลือกพระเนตร 2 ชั้น สันพระนาสิกและปีกจมูก ริมพระโอษฐ์บน-ล่างแย้มพระสรวล กุณฑลระย้าประดับทับทิม ธำมรงค์เพชรที่นิ้วพระหัตถ์ ซุ้มเรือนแก้วรัศมีเปลวทอง ฉัตรทอง 9 ชั้น ต้นไม้เงิน-ต้นไม้ทอง และรองรับการสลับเครื่องทรงทั้ง 3 ฤดู'
    },
    {
      id: 'bronze_buddha_hall',
      name: 'โถงพระประธานสำริดรมดำประกายทอง & พระพุทธรูปขนาบข้างบนฐานบัวทอง',
      shortName: '🙏 พระประธานสำริด & เสาแดงลายทอง',
      badge: 'ภายในพระวิหารยอด',
      style: 'ปางมารวิชัยสำริดรมดำปิดทอง & ลายรดน้ำ',
      zone: 'โถงในพระวิหารยอด',
      pos: [-19.5, 7.5, -34.5],
      camPos: [-19.5, 4.8, -23.2],
      camTarget: [-19.5, 5.8, -34.8],
      cutaway: false,
      desc: 'องค์พระประธานปางมารวิชัยสำริดรมดำประกายทอง ปั้นพระวรกายเรียบสง่างามด้วย Lathe Geometry 36 ส่วน นิ้วพระหัตถ์ขวาทั้ง 5 นิ้วชี้ลงธรณี เม็ดพระศกขมวดก้นหอยเรียงรอบพระเศียร 3 ชั้น ขนาบซ้าย-ขวาด้วยพระพุทธรูปองค์เล็กที่ประดิษฐานอยู่บนแท่นฐานบัวทองคำเหนือฐานชุกชีอย่างสมบูรณ์'
    },
    {
      id: 'lawn_cloister_panorama',
      name: 'สนามหญ้าหน้าพระระเบียงคด 3 มหาเจดีย์ & ต้นไม้ทรงกรวย 3 ต้น',
      shortName: '🌿 สนามหญ้า & 3 มหาเจดีย์',
      badge: 'มุมภาพถ่ายใหม่ (Lawn Panorama)',
      style: 'พระระเบียงคด • 3 มหาเจดีย์ • ตึกยุโรป',
      zone: 'สนามหญ้าด้านทิศตะวันตก',
      pos: [-42.0, 12.0, -6.0],
      camPos: [-62.5, 5.5, -2.5],
      camTarget: [-12.0, 14.5, 2.0],
      cutaway: false,
      desc: 'มุมมองพาโนรามาจากสนามหญ้าสีเขียวขจีหน้ากำแพงพระระเบียงคด: ด้านหน้าคือซุ้มประตูพระระเบียงคด เสาไฟสีเขียว กระถางไม้ดัด ต้นไม้ตัดแต่งทรงกรวย 3 ต้น และอาคารทรงยุโรปสีเหลืองครีมซุ้มหน้าต่างโค้งสีน้ำเงิน เบื้องหลังคือพระศรีรัตนเจดีย์สีทอง พระมณฑป ปราสาทพระเทพบิดร และหลังคาพระอุโบสถสีน้ำเงินขอบส้ม'
    },
    {
      id: 'street_tuk_tuk_bus',
      name: 'ถนนมหาราช: รถเมล์ ขสมก. รถตุ๊กตุ๊ก แท็กซี่ เรือด่วนเจ้าพระยา & นักท่องเที่ยว',
      shortName: '🛺 รถเมล์ ขสมก. & รถตุ๊กตุ๊ก',
      badge: 'ถนน 4 เลน + เรือด่วนเจ้าพระยา',
      style: 'รถเมล์ ขสมก. • ตุ๊กตุ๊ก • เรือด่วนเจ้าพระยา',
      zone: 'ถนนมหาราช - ท่าช้าง - แม่น้ำเจ้าพระยา',
      pos: [-78.0, 3.2, -12.0],
      camPos: [-94.5, 6.2, -32.0],
      camTarget: [-76.0, 3.2, -6.0],
      cutaway: false,
      desc: 'ถนนมหาราชขนาด 4 ช่องจราจรพร้อมขอบฟุตบาททาสีขาว-แดงสลับกัน ขนาบด้วยตึกแถวอนุรักษ์โคโลเนียลสีครีมเหลืองริมน้ำ และเรือด่วนเจ้าพระยาธงส้มกับเรือหางยาวแล่นในแม่น้ำเจ้าพระยา มีรถเมล์ครีม-แดง ขสมก. (สาย 1) รถเมล์ยูโรทูสีส้ม (สาย 508) รถสามล้อตุ๊กตุ๊ก รถแท็กซี่มิเตอร์ และขบวนทัวร์นักท่องเที่ยว'
    },
    {
      id: 'pantheon_front_twins',
      name: 'ปราสาทพระเทพบิดร & พระสุวรรณเจดีย์คู่ยักษ์แบก (Front Portico)',
      shortName: '👑 หน้าปราสาทพระเทพบิดร & ยักษ์แบก',
      badge: 'มุขหน้าฐานไพที',
      style: 'ซุ้มรวงผึ้งทอง 3 โค้ง & เจดีย์ย่อมุมไม้สิบสอง',
      zone: 'ด้านหน้าปราสาทพระเทพบิดร (ทิศตะวันออก)',
      pos: [29.2, 14.5, -12],
      camPos: [44.2, 5.2, -12.0],
      camTarget: [20.0, 14.5, -12.0],
      cutaway: false,
      desc: 'มุมมองสมมาตรด้านหน้าปราสาทพระเทพบิดร ขนาบซ้าย-ขวาด้วยพระสุวรรณเจดีย์ย่อมุมไม้สิบสองสีทองอร่ามที่มี "ยักษ์แบกและลิงแบก" รอบฐานเจดีย์ ตรงกลางเป็นมุขเสาทอง 4 ต้นรับซุ้มรวงผึ้ง 3 โค้ง หน้าบันพระนารายณ์ทรงครุฑ ใบระกาหยัก และกระถางมังกรลายครามคู่หน้าบันไดหินอ่อน'
    },
    {
      id: 'ubosot_sala_closeup',
      name: 'พระอุโบสถ ศาลาราย 12 หลัง ซุ้มพัทธสีมา อ่างบัวหลวง & กระถางธูปสำริด',
      shortName: '🏛️ ศาลาราย & ซุ้มพัทธสีมา',
      badge: 'เขตพุทธาวาสตอนใต้',
      style: 'เสาหุ้มทองประดับกระเบื้องสีฟ้า-ขาว & กระดิ่งชายคา',
      zone: 'รอบพระอุโบสถ',
      pos: [-15.6, 7.5, 41.2],
      camPos: [-23.5, 4.8, 49.5],
      camTarget: [-6.0, 9.5, 18.0],
      cutaway: false,
      desc: 'มุมมองระดับสายตาหน้าพระอุโบสถ เห็นกระเบื้องหลังคาเกล็ดเต่าพร้อมเชิงชายเทพพนมทอง กระดิ่งทองใบโพธิ์แขวนเรียงรายใต้ชายคา ใบระกาหยัก ครุฑยุดนาคกางปีกรอบฐานสิงห์ ซุ้มพัทธสีมาสีทองยอดน้ำเงิน-แดง ศาลารายเสาขาว อ่างบัวลายคราม และกระถางธูปสามขาสำริด'
    },
    {
      id: 'emerald_buddha',
      name: 'ภายในพระอุโบสถ & องค์พระแก้วมรกต (Phra Kaew Morakot Shrine)',
      shortName: '✨ องค์พระแก้วมรกต (ภายใน)',
      badge: 'ภายในพระอุโบสถ',
      style: 'บุษบกทองคำ & เพดานดาวทอง',
      zone: 'ห้องประธานพระอุโบสถ',
      pos: [0, 9.5, 14.2],
      camPos: [0, 6.4, 25.2],
      camTarget: [0, 6.8, 13.5],
      cutaway: true,
      desc: 'ภายในห้องประธานพระอุโบสถ ขนาบด้วยเสาแดงเขียนลายพุ่มข้าวบิณฑ์สีทอง 6 ต้น เพดานสีแดงประดับดาวทอง โคมระย้าคริสตัล 4 ดวง ผนังกระจกสีเขียวมรกตเรืองแสง ซุ้มเรือนยอดบุษบก ฉัตรทอง 9 ชั้น ต้นไม้เงิน-ต้นไม้ทอง และพุทธศาสนิกชนพนมมือไหว้พระ'
    },
    {
      id: 'chedi',
      name: 'พระศรีรัตนเจดีย์ พรมแดงทางเดิน & ตุ๊กตาอับเฉาหินจีน',
      shortName: 'พระศรีรัตนเจดีย์',
      badge: 'ฐานไพที (ทิศตะวันตก)',
      style: 'เจดีย์ทรงลังกาหุ้มโมเสกทองคำ (ร.4)',
      zone: 'ฐานไพทีด้านตะวันตก',
      pos: [-20.5, 40, -12],
      camPos: [-35.5, 6.8, -32.5],
      camTarget: [-8.5, 15.5, -10.5],
      cutaway: false,
      desc: 'พระเจดีย์ทรงระฆังคว่ำแบบลังกาหุ้มกระเบื้องโมเสกทองคำเหลืองอร่าม รอบฐานมีซุ้มจระนำยอดเจดีย์ทั้ง 4 ทิศและเจดีย์ทิศทั้ง 4 มุม ด้านล่างมีพรมทางเดินสีแดงพร้อมพระภิกษุและนักท่องเที่ยวเดินชมวัด'
    },
    {
      id: 'mondop',
      name: 'พระมณฑป ปราสาทนครวัดจำลอง และศาลาราย (Phra Mondop)',
      shortName: 'พระมณฑป (ยอด 7 ชั้น)',
      badge: 'ฐานไพที (ตอนกลาง)',
      style: 'มณฑปจัตุรมุขยอด 7 ชั้น & บานประตูมุก',
      zone: 'กึ่งกลางฐานไพที',
      pos: [0, 38, -12],
      camPos: [6.5, 5.8, 16.5],
      camTarget: [-4.5, 16.5, -12.0],
      cutaway: false,
      desc: 'หอพระไตรปิฎกทรงมณฑปจัตุรมุขยอด 7 ชั้น บานประตูประดับมุกไฟลายราชวัตร ล้อมด้วยเสาเหลี่ยมหุ้มทองประดับกระจก ด้านเหนือประดิษฐานปราสาทนครวัดจำลองรายละเอียดสูง 5 ยอดปรางค์'
    },
    {
      id: 'ubosot',
      name: 'พระอุโบสถ (Phra Ubosot Exterior)',
      shortName: 'พระอุโบสถ',
      badge: 'ประธานพุทธาวาส',
      style: 'รัตนโกสินทร์ (ร.1-ร.3)',
      zone: 'ตอนกลาง-ใต้',
      pos: [0, 23, 18],
      camPos: [-38, 26, 54],
      camTarget: [0, 11, 18],
      cutaway: false,
      desc: 'พระอุโบสถทรงไทยหลังคาลด 3 ชั้น มุงกระเบื้องดินเผาเคลือบเกล็ดเต่าสีน้ำเงินครามเข้มและสีส้มทองพร้อม Bump Map นูนต่ำ ใบระกาหยัก กระดิ่งทองแขวนชายคา หน้าบันพระนารายณ์ทรงครุฑ บานประตูประดับมุกไฟ และศาลาราย 12 หลัง'
    },
    {
      id: 'pantheon',
      name: 'ปราสาทพระเทพบิดร & พระสุวรรณเจดีย์คู่',
      shortName: 'ปราสาทพระเทพบิดร',
      badge: 'ฐานไพที (ทิศตะวันออก)',
      style: 'ปราสาทจัตุรมุขยอดปรางค์',
      zone: 'ฐานไพทีด้านตะวันออก',
      pos: [20, 41, -12],
      camPos: [56, 34, -26],
      camTarget: [20, 16, -12],
      cutaway: false,
      desc: 'ปราสาทจัตุรมุขยอดพระปรางค์ประดับกระเบื้องเบญจรงค์และนภศูลทองคำ ด้านหน้าขนาบด้วยพระสุวรรณเจดีย์ย่อมุมไม้สิบสองสีทองคู่พร้อมยักษ์แบก-ลิงแบก และกระถางมังกรลายคราม'
    },
    {
      id: 'eight_prangs',
      name: 'พระอัษฎามหาเจดีย์ (พระปรางค์กระเบื้องเคลือบ 8 องค์)',
      shortName: 'พระอัษฎามหาเจดีย์ (8 องค์)',
      badge: 'แนวทิศตะวันออก',
      style: 'พระปรางค์ย่อมุมไม้ยี่สิบ 8 สี',
      zone: 'หน้าวัดด้านทิศตะวันออก',
      pos: [45.8, 25, 0],
      camPos: [84, 30, 24],
      camTarget: [42, 13, 0],
      cutaway: false,
      desc: 'พระปรางค์ย่อมุมไม้ยี่สิบขนาดใหญ่ 8 องค์ เรียงรายตามแนวทิศเหนือ-ใต้ นอกพระระเบียงคดด้านทิศตะวันออก ประดับกระเบื้องเคลือบเบญจรงค์ 8 สี พร้อมซุ้มทิศและนภศูลทองคำ'
    },
    {
      id: 'wihan_yot',
      name: 'พระวิหารยอด & หอพระมณเฑียรธรรม',
      shortName: 'พระวิหารยอด & หอพระมณเฑียรธรรม',
      badge: 'เขตพุทธาวาสตอนเหนือ',
      style: 'ทรงพระมหามงกุฎ & สถาปัตยกรรมไทย',
      zone: 'ด้านทิศเหนือของฐานไพที',
      pos: [0, 24, -31.5],
      camPos: [0, 48, -84],
      camTarget: [0, 12, -24],
      cutaway: false,
      desc: 'กลุ่มอาคารสำคัญทางทิศเหนือของฐานไพที ประกอบด้วยพระวิหารยอดซึ่งภายในประดิษฐานพระประธานสำริดรมดำประกายทองและเสาแดงลายทองรดน้ำ หอพระมณเฑียรธรรม และหอพระนาก'
    },
    {
      id: 'grand_palace',
      name: 'พระบรมมหาราชวัง ศาลหลักเมือง ท้องสนามหลวง & ท่าช้าง',
      shortName: '👑 พระบรมมหาราชวัง & รอบวัด',
      badge: 'บริบทรอบเกาะรัตนโกสินทร์',
      style: 'พระที่นั่งจักรีฯ • ศาลหลักเมือง • สนามหลวง',
      zone: 'รอบวัดพระศรีรัตนศาสดาราม',
      pos: [-18, 22, 72],
      camPos: [-82, 42, 108],
      camTarget: [-15, 10, 52],
      cutaway: false,
      desc: 'บริบทรอบวัดพระแก้วครบถ้วน: พระที่นั่งจักรีมหาปราสาท พระที่นั่งดุสิตมหาปราสาท พระที่นั่งอมรินทรวินิจฉัย ศาลหลักเมืองกรุงเทพมหานคร ท้องสนามหลวง ตึกแถวอนุรักษ์โคโลเนียลท่าช้าง เรือด่วนเจ้าพระยา รถเมล์ ขสมก. และรถตุ๊กตุ๊ก'
    }
  ];

  const CAMERA_PRESETS = {
    yaksha_green_white: { pos: [-19.8, 4.8, 1.5], target: [-31.2, 5.6, 1.5], cutaway: false },
    yaksha_gate: { pos: [0, 5.0, -54.8], target: [0, 6.0, -41.0], cutaway: false },
    lawn_cloister_panorama: { pos: [-62.5, 5.5, -2.5], target: [-12.0, 14.5, 2.0], cutaway: false },
    street_tuk_tuk_bus: { pos: [-94.5, 6.2, -32.0], target: [-76.0, 3.2, -6.0], cutaway: false },
    bronze_buddha_hall: { pos: [-19.5, 4.8, -23.2], target: [-19.5, 5.8, -34.8], cutaway: false },
    pantheon_front_twins: { pos: [44.2, 5.2, -12.0], target: [20.0, 14.5, -12.0], cutaway: false },
    emerald_buddha_closeup: { pos: [0, 7.0, 18.2], target: [0, 9.5, 14.2], cutaway: true },
    ubosot_sala_closeup: { pos: [-23.5, 4.8, 49.5], target: [-6.0, 9.5, 18.0], cutaway: false },
    emerald_buddha: { pos: [0, 6.4, 25.2], target: [0, 6.8, 13.5], cutaway: true },
    grand_palace: { pos: [-82, 42, 108], target: [-15, 10, 52], cutaway: false },
    overview: { pos: [-105, 64, 98], target: [-5, 11, 8], cutaway: false },
    north_axis: { pos: [0, 66, -98], target: [0, 9, 8], cutaway: false },
    ubosot: { pos: [-38, 26, 54], target: [0, 11, 18], cutaway: false },
    chedi: { pos: [-35.5, 6.8, -32.5], target: [-8.5, 15.5, -10.5], cutaway: false },
    pantheon: { pos: [44.2, 5.2, -12.0], target: [20.0, 14.5, -12.0], cutaway: false }
  };

  function init() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0284c7);
    scene.environment = envMap;
    scene.fog = new THREE.FogExp2(0x38bdf8, 0.0011);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 950);
    camera.position.set(-19.8, 4.8, 1.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.01;
    controls.minDistance = 2.0;
    controls.maxDistance = 300;
    controls.target.set(-31.2, 5.6, 1.5);

    const templeModelGroup = new THREE.Group();
    templeModelGroup.name = 'Wat_Phra_Kaew_Masterpiece_3D';
    scene.add(templeModelGroup);

    const { cutawayWallsGroup, attireGroups } = buildPhraUbosot(templeModelGroup);
    buildUpperTerrace(templeModelGroup);
    const animatedObjects = buildPrecinctAndSurroundings(templeModelGroup);

    let meshCount = 0;
    let triCount = 0;
    templeModelGroup.traverse(obj => {
      if (obj.isMesh && obj.geometry) {
        meshCount++;
        const geom = obj.geometry;
        triCount += geom.index ? Math.floor(geom.index.count / 3) : Math.floor(geom.attributes.position.count / 3);
      }
    });
    const statsEl = document.getElementById('stats-badge');
    if (statsEl) {
      statsEl.textContent = `${meshCount.toLocaleString()} ชิ้นส่วน • ${triCount.toLocaleString()} โพลิกอน`;
    }

    const ambientLight = new THREE.AmbientLight(0xfffbeb, 0.90);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0xfde68a, 0.72);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.98);
    sunLight.position.set(-68, 94, 68);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 300;
    const d = 105;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const nightLights = [];
    [
      [-20.5, 22, -12],
      [0, 22, -12],
      [20, 22, -12],
      [29, 16, -4],
      [0, 16, 18],
      [45.8, 16, 0]
    ].forEach(([tx, ty, tz]) => {
      const pLight = new THREE.PointLight(0xffb703, 0.35, 65, 1.7);
      pLight.position.set(tx, ty + 6, tz + 8);
      scene.add(pLight);
      nightLights.push(pLight);
    });

    function updateSunAngle(deg) {
      const slider = document.getElementById('sun-slider');
      const valSpan = document.getElementById('sun-angle-val');
      if (slider) slider.value = deg;
      if (valSpan) valSpan.textContent = deg + '°';
      const rad = (deg * Math.PI) / 180;
      const r = 115;
      sunLight.position.set(-Math.cos(rad) * r, Math.sin(rad) * r, 58);
    }

    function setLightingPreset(mode) {
      const labelEl = document.getElementById('time-label');
      document.querySelectorAll('.light-btn').forEach(btn => {
        const active = btn.dataset.light === mode;
        btn.className = active
          ? 'light-btn px-2 py-1.5 rounded-lg text-[11px] bg-amber-500/30 text-amber-200 border border-amber-400/50 transition'
          : 'light-btn px-2 py-1.5 rounded-lg text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition';
      });

      if (mode === 'morning') {
        scene.background.setHex(0x38bdf8);
        scene.fog.color.setHex(0xbae6fd);
        ambientLight.color.setHex(0xfff1f2);
        ambientLight.intensity = 0.82;
        sunLight.color.setHex(0xffe4b5);
        sunLight.intensity = 1.65;
        updateSunAngle(32);
        nightLights.forEach(l => { l.intensity = 0.15; });
        labelEl.textContent = 'เช้าตรู่ (Morning Mist)';
      } else if (mode === 'noon') {
        scene.background.setHex(0x0284c7);
        scene.fog.color.setHex(0x38bdf8);
        ambientLight.color.setHex(0xfffbeb);
        ambientLight.intensity = 0.90;
        sunLight.color.setHex(0xfff7ed);
        sunLight.intensity = 1.98;
        updateSunAngle(68);
        nightLights.forEach(l => { l.intensity = 0.35; });
        labelEl.textContent = 'กลางวันแดดจัด (สีวัดจริง)';
      } else if (mode === 'sunset') {
        scene.background.setHex(0x1e293b);
        scene.fog.color.setHex(0x334155);
        ambientLight.color.setHex(0xffedd5);
        ambientLight.intensity = 0.72;
        sunLight.color.setHex(0xff9e44);
        sunLight.intensity = 1.95;
        updateSunAngle(36);
        nightLights.forEach(l => { l.intensity = 0.75; });
        labelEl.textContent = 'ยามเย็น (Golden Hour)';
      } else if (mode === 'night') {
        scene.background.setHex(0x090d16);
        scene.fog.color.setHex(0x090d16);
        ambientLight.color.setHex(0x1e293b);
        ambientLight.intensity = 0.40;
        sunLight.color.setHex(0x64748b);
        sunLight.intensity = 0.30;
        updateSunAngle(135);
        nightLights.forEach(l => { l.intensity = 2.6; });
        labelEl.textContent = 'กลางคืนประดับไฟ (Night Glow)';
      }
    }

    let isCutaway = false;
    function setCutawayMode(enabled) {
      isCutaway = enabled;
      cutawayWallsGroup.visible = !isCutaway;
      const cutBtn = document.getElementById('btn-cutaway');
      if (cutBtn) {
        cutBtn.textContent = isCutaway ? '🏛️ ปิดผนังพระอุโบสถ' : '✨ ชมองค์พระแก้วมรกต (ภายใน)';
        cutBtn.className = isCutaway
          ? 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 shadow-md transition'
          : 'px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 transition';
      }
    }

    function setSeasonAttire(season) {
      if (!attireGroups) return;
      attireGroups.summer.visible = (season === 'summer');
      attireGroups.rainy.visible = (season === 'rainy');
      attireGroups.winter.visible = (season === 'winter');

      document.querySelectorAll('.season-btn').forEach(btn => {
        const active = btn.dataset.season === season;
        btn.className = active
          ? 'season-btn px-2 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 transition'
          : 'season-btn px-2 py-1 rounded-lg text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition';
      });

      const ebItem = LANDMARKS.find(l => l.id === 'emerald_buddha_closeup');
      if (ebItem) {
        selectLandmark(ebItem);
        const sInfo = SEASON_DESCRIPTIONS[season];
        if (sInfo) {
          document.getElementById('info-badge').textContent = sInfo.badge;
          document.getElementById('info-title').textContent = sInfo.title;
          document.getElementById('info-desc').textContent = sInfo.desc;
          document.getElementById('info-style').textContent = sInfo.style;
        }
      }
    }

    let camAnim = null;
    function animateCameraTo(targetPosArr, lookAtArr) {
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();
      const endPos = new THREE.Vector3(...targetPosArr);
      const endTarget = new THREE.Vector3(...lookAtArr);
      const duration = 850;
      const startTime = performance.now();

      camAnim = function (now) {
        const t = Math.min(1, (now - startTime) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        camera.position.lerpVectors(startPos, endPos, ease);
        controls.target.lerpVectors(startTarget, endTarget, ease);
        if (t >= 1) camAnim = null;
      };
    }

    const labelsContainer = document.getElementById('labels-container');
    let showLabels = true;
    const hotspotElements = [];

    function selectLandmark(item) {
      document.getElementById('info-badge').textContent = item.badge;
      document.getElementById('info-title').textContent = item.name;
      document.getElementById('info-desc').textContent = item.desc;
      document.getElementById('info-style').textContent = item.style;
      document.getElementById('info-zone').textContent = item.zone;
      document.getElementById('info-body').classList.remove('hidden');
      document.getElementById('btn-close-info').textContent = '−';

      if (typeof item.cutaway === 'boolean') {
        setCutawayMode(item.cutaway);
      }
      animateCameraTo(item.camPos, item.camTarget);
    }

    LANDMARKS.forEach(item => {
      const el = document.createElement('button');
      el.className = 'hotspot-label px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/85 text-amber-300 border border-amber-400/60 shadow-lg flex items-center gap-1.5 hover:bg-amber-400 hover:text-slate-950';
      el.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400 inline-block"></span><span>${item.shortName}</span>`;
      el.addEventListener('click', () => selectLandmark(item));
      labelsContainer.appendChild(el);
      hotspotElements.push({ el, item, vec: new THREE.Vector3(...item.pos) });
    });

    function updateHotspotPositions() {
      if (!showLabels) return;
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      hotspotElements.forEach(h => {
        const projected = h.vec.clone().project(camera);
        if (projected.z > 1) {
          h.el.style.display = 'none';
          return;
        }
        const x = projected.x * halfW + halfW;
        const y = -projected.y * halfH + halfH;
        h.el.style.display = 'flex';
        h.el.style.left = `${x}px`;
        h.el.style.top = `${y}px`;
      });
    }

    document.querySelectorAll('.cam-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cam;
        const preset = CAMERA_PRESETS[key];
        if (preset) {
          if (typeof preset.cutaway === 'boolean') setCutawayMode(preset.cutaway);
          animateCameraTo(preset.pos, preset.target);
        }
        document.querySelectorAll('.cam-btn').forEach(b => {
          b.className = 'cam-btn text-left px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/70 text-slate-200 border border-slate-700/60 hover:bg-slate-700/80 transition flex items-center justify-between';
        });
        btn.className = 'cam-btn text-left px-3 py-2 rounded-xl text-xs font-medium bg-amber-500/25 text-amber-200 border border-amber-400/40 hover:bg-amber-500/35 transition flex items-center justify-between';

        const matchingLandmark = LANDMARKS.find(l => l.id === key);
        if (matchingLandmark) selectLandmark(matchingLandmark);
      });
    });

    document.querySelectorAll('.season-btn').forEach(btn => {
      btn.addEventListener('click', () => setSeasonAttire(btn.dataset.season));
    });

    document.getElementById('btn-reset-cam').addEventListener('click', () => {
      setCutawayMode(false);
      animateCameraTo(CAMERA_PRESETS.yaksha_green_white.pos, CAMERA_PRESETS.yaksha_green_white.target);
    });

    const cutBtn = document.getElementById('btn-cutaway');
    if (cutBtn) {
      cutBtn.addEventListener('click', () => {
        setCutawayMode(!isCutaway);
        if (isCutaway) {
          const eb = LANDMARKS.find(l => l.id === 'emerald_buddha_closeup');
          if (eb) selectLandmark(eb);
        }
      });
    }

    let autoRotate = false;
    document.getElementById('btn-tour').addEventListener('click', () => {
      autoRotate = !autoRotate;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.25;
      document.getElementById('tour-icon').textContent = autoRotate ? '⏸' : '▶';
      document.getElementById('tour-text').textContent = autoRotate ? 'หยุดหมุนอัตโนมัติ' : 'หมุนชมอัตโนมัติ';
    });

    document.getElementById('btn-labels').addEventListener('click', (e) => {
      showLabels = !showLabels;
      labelsContainer.style.display = showLabels ? 'block' : 'none';
      e.currentTarget.textContent = showLabels ? '🏷️ ป้ายชื่อ: เปิด' : '🏷️ ป้ายชื่อ: ปิด';
    });

    let isWireframe = false;
    document.getElementById('btn-wireframe').addEventListener('click', (e) => {
      isWireframe = !isWireframe;
      allMaterials.forEach(m => { m.wireframe = isWireframe; });
      e.currentTarget.className = isWireframe
        ? 'px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500/30 text-amber-200 border border-amber-400/50 transition'
        : 'px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600/50 transition';
    });

    document.querySelectorAll('.light-btn').forEach(btn => {
      btn.addEventListener('click', () => setLightingPreset(btn.dataset.light));
    });
    document.getElementById('sun-slider').addEventListener('input', (e) => {
      updateSunAngle(Number(e.target.value));
    });

    document.getElementById('btn-close-info').addEventListener('click', (e) => {
      const body = document.getElementById('info-body');
      const hidden = body.classList.toggle('hidden');
      e.currentTarget.textContent = hidden ? '+' : '−';
    });

    const photosModal = document.getElementById('photos-modal');
    document.getElementById('btn-photos').addEventListener('click', () => {
      photosModal.classList.remove('hidden');
      photosModal.classList.add('flex');
    });
    document.getElementById('btn-close-modal').addEventListener('click', () => {
      photosModal.classList.add('hidden');
      photosModal.classList.remove('flex');
    });
    document.querySelectorAll('.jump-cam-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.jumpCam;
        const preset = CAMERA_PRESETS[key];
        if (preset) {
          if (typeof preset.cutaway === 'boolean') setCutawayMode(preset.cutaway);
          animateCameraTo(preset.pos, preset.target);
        }
        photosModal.classList.add('hidden');
        photosModal.classList.remove('flex');
      });
    });

    function exportSceneToOBJ() {
      let output = '# Wat Phra Kaew Masterpiece 3D Model\n';
      let vertexOffset = 1;
      const v = new THREE.Vector3();

      templeModelGroup.updateMatrixWorld(true);
      templeModelGroup.traverse(child => {
        if (child.isMesh && child.geometry) {
          const geom = child.geometry.clone();
          geom.applyMatrix4(child.matrixWorld);
          const pos = geom.attributes.position;
          if (!pos) return;

          output += `o Mesh_${child.id}\n`;
          for (let i = 0; i < pos.count; i++) {
            v.fromBufferAttribute(pos, i);
            output += `v ${v.x.toFixed(4)} ${v.y.toFixed(4)} ${v.z.toFixed(4)}\n`;
          }

          if (geom.index) {
            const idx = geom.index;
            for (let i = 0; i < idx.count; i += 3) {
              const a = idx.getX(i) + vertexOffset;
              const b = idx.getX(i + 1) + vertexOffset;
              const c = idx.getX(i + 2) + vertexOffset;
              output += `f ${a} ${b} ${c}\n`;
            }
          } else {
            for (let i = 0; i < pos.count; i += 3) {
              const a = i + vertexOffset;
              const b = i + 1 + vertexOffset;
              const c = i + 2 + vertexOffset;
              output += `f ${a} ${b} ${c}\n`;
            }
          }
          vertexOffset += pos.count;
        }
      });

      const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wat_phra_kaew_masterpiece_3d.obj';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const toast = document.getElementById('toast');
      toast.style.opacity = '1';
      setTimeout(() => { toast.style.opacity = '0'; }, 2800);
    }

    document.getElementById('btn-export-obj').addEventListener('click', exportSceneToOBJ);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate(now) {
      requestAnimationFrame(animate);
      if (camAnim) camAnim(now);

      const t = (now || 0) * 0.003;
      animatedObjects.flags.forEach((flag, idx) => {
        flag.rotation.y = Math.sin(t + idx) * 0.18;
      });

      animatedObjects.vehicles.forEach(vObj => {
        const sp = vObj.spec;
        if (sp.axis === 'x') {
          vObj.mesh.position.x += sp.dir * sp.speed;
          if (sp.dir > 0 && vObj.mesh.position.x > 66) vObj.mesh.position.x = -66;
          if (sp.dir < 0 && vObj.mesh.position.x < -66) vObj.mesh.position.x = 66;
        } else {
          vObj.mesh.position.z += sp.dir * sp.speed;
          if (sp.dir > 0 && vObj.mesh.position.z > 88) vObj.mesh.position.z = -88;
          if (sp.dir < 0 && vObj.mesh.position.z < -88) vObj.mesh.position.z = 88;
        }
      });

      if (animatedObjects.walkers) {
        animatedObjects.walkers.forEach(wObj => {
          const sp = wObj.spec;
          const fig = wObj.mesh;
          if (sp.axis === 'x') {
            fig.position.x += sp.dir * sp.speed;
            if (fig.position.x > sp.max) {
              fig.position.x = sp.max;
              sp.dir = -1;
              fig.rotation.y = -Math.PI / 2;
            } else if (fig.position.x < sp.min) {
              fig.position.x = sp.min;
              sp.dir = 1;
              fig.rotation.y = Math.PI / 2;
            }
          } else {
            fig.position.z += sp.dir * sp.speed;
            if (fig.position.z > sp.max) {
              fig.position.z = sp.max;
              sp.dir = -1;
              fig.rotation.y = Math.PI;
            } else if (fig.position.z < sp.min) {
              fig.position.z = sp.min;
              sp.dir = 1;
              fig.rotation.y = 0;
            }
          }

          const ud = fig.userData;
          if (ud && ud.leftLeg && ud.rightLeg) {
            const swing = Math.sin(t * 2.8 + wObj.phase) * 0.42;
            ud.leftLeg.rotation.x = swing;
            ud.rightLeg.rotation.x = -swing;
            if (ud.pose === 'walk') {
              ud.leftArm.rotation.x = -swing * 0.7;
              ud.rightArm.rotation.x = swing * 0.7;
            }
          }
        });
      }

      controls.update();
      updateHotspotPositions();
      renderer.render(scene, camera);
    }

    animate(performance.now());
  }

  return { init };
})();

window.onload = function () {
  window.WPKApp.init();
};
