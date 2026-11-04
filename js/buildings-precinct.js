// ============================================================================
// MODULE 5: PRECINCT, DUAL-FACING CLOISTER GATES, BRONZE CENSERS,
//           CHAO PHRAYA BOATS, 70+ TOURISTS & HIGH-CLARITY VEHICLES
// ============================================================================

window.WPKPrecinct = (function () {
  const { MAT, allMaterials, createPorcelainPrangTexture } = window.WPKTextures;
  const {
    addShadow,
    createThaiRoof,
    createPrang,
    createYakshaGuardian,
    createBronzeMaraVijayaBuddha,
    createBangkokBus,
    createThaiTukTuk,
    createBangkokTaxi,
    createPersonFigure,
    createLotusBasin,
    createBronzeCenserAltar,
    createChaoPhrayaBoat,
    createVintageLampPost,
    createThaiTree,
    createConicalTopiaryTree
  } = window.WPKBuilders;

  function buildPrecinctAndSurroundings(templeModelGroup) {
    const animatedObjects = { flags: [], vehicles: [], walkers: [] };

    // 1. EXPANDED MULTI-LANE ROAD NETWORK & RED-AND-WHITE STRIPED CURBSTONES
    const roadBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(280, 0.6, 280), MAT.asphaltRoad));
    roadBase.position.y = -0.3;
    templeModelGroup.add(roadBase);

    const sidewalkBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(136, 0.72, 154), MAT.sidewalk));
    sidewalkBase.position.set(0, 0.06, 9);
    templeModelGroup.add(sidewalkBase);

    for (let z = -66; z <= 84; z += 3.0) {
      const isRed = (Math.floor(z / 3) % 2 === 0);
      const curbMat = isRed ? MAT.redDoor : MAT.whiteStucco;
      [-68.1, 68.1].forEach(cx => {
        const curbSeg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 2.95), curbMat);
        curbSeg.position.set(cx, 0.28, z);
        templeModelGroup.add(curbSeg);
      });
    }
    for (let x = -66; x <= 66; x += 3.0) {
      const isRed = (Math.floor(x / 3) % 2 === 0);
      const curbMat = isRed ? MAT.redDoor : MAT.whiteStucco;
      const curbSegN = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.36, 0.42), curbMat);
      curbSegN.position.set(x, 0.28, -68.1);
      templeModelGroup.add(curbSegN);
    }

    const riversidePromenade = addShadow(new THREE.Mesh(new THREE.BoxGeometry(22, 0.72, 240), MAT.sidewalk));
    riversidePromenade.position.set(-107, 0.06, 0);
    templeModelGroup.add(riversidePromenade);

    const eastSidewalk = addShadow(new THREE.Mesh(new THREE.BoxGeometry(28, 0.72, 240), MAT.sidewalk));
    eastSidewalk.position.set(106, 0.06, 0);
    templeModelGroup.add(eastSidewalk);

    const chaoPhrayaRiver = new THREE.Mesh(new THREE.BoxGeometry(50, 0.5, 280), MAT.riverWater);
    chaoPhrayaRiver.position.set(-143, -0.15, 0);
    templeModelGroup.add(chaoPhrayaRiver);

    for (let z = -95; z <= 95; z += 9) {
      const centerWest = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 5.2), MAT.ministryYellow);
      centerWest.position.set(-83.0, 0.04, z);
      templeModelGroup.add(centerWest);

      [-76.5, -89.5].forEach(lx => {
        const dashW = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 3.8), MAT.whiteStucco);
        dashW.position.set(lx, 0.04, z);
        templeModelGroup.add(dashW);
      });

      const centerEast = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 5.2), MAT.ministryYellow);
      centerEast.position.set(80.0, 0.04, z);
      templeModelGroup.add(centerEast);

      [74.0, 86.0].forEach(lx => {
        const dashE = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 3.8), MAT.whiteStucco);
        dashE.position.set(lx, 0.04, z);
        templeModelGroup.add(dashE);
      });
    }

    for (let x = -66; x <= 66; x += 9) {
      const centerNorth = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.08, 0.28), MAT.ministryYellow);
      centerNorth.position.set(x, 0.04, -79.0);
      templeModelGroup.add(centerNorth);

      [-73.5, -84.5].forEach(lz => {
        const dashN = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 0.22), MAT.whiteStucco);
        dashN.position.set(x, 0.04, lz);
        templeModelGroup.add(dashN);
      });
    }

    for (let s = -5; s <= 5; s++) {
      const stripeW = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.09, 3.6), MAT.whiteStucco);
      stripeW.position.set(-83.0 + s * 2.1, 0.05, -20.0);
      templeModelGroup.add(stripeW);

      const stripeN = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.09, 1.2), MAT.whiteStucco);
      stripeN.position.set(0, 0.05, -79.0 + s * 1.8);
      templeModelGroup.add(stripeN);
    }

    for (let z = -60; z <= 60; z += 24) {
      const sLampW = createVintageLampPost(0.95);
      sLampW.position.set(-67.2, 0.4, z);
      templeModelGroup.add(sLampW);

      const sLampE = createVintageLampPost(0.95);
      sLampE.position.set(67.2, 0.4, z);
      templeModelGroup.add(sLampE);
    }

    const westLawnStrip = addShadow(new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.78, 114), MAT.lawnGrass));
    westLawnStrip.position.set(-60.2, 0.15, 0);
    templeModelGroup.add(westLawnStrip);

    const northLawnStrip = addShadow(new THREE.Mesh(new THREE.BoxGeometry(118, 0.78, 9.5), MAT.lawnGrass));
    northLawnStrip.position.set(0, 0.15, -61.5);
    templeModelGroup.add(northLawnStrip);

    function createTopiaryParterre(x, z, rotY) {
      const g = new THREE.Group();
      const outerBox = addShadow(new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.55, 11.5), MAT.manicuredHedge));
      outerBox.position.y = 0.28;
      g.add(outerBox);
      const centerDiamond = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.75, 2.0), MAT.manicuredHedge));
      centerDiamond.position.y = 0.38;
      centerDiamond.rotation.y = Math.PI / 4;
      g.add(centerDiamond);
      g.position.set(x, 0.55, z);
      g.rotation.y = rotY || 0;
      return g;
    }

    for (let z = -42; z <= 42; z += 21) {
      templeModelGroup.add(createTopiaryParterre(-60.2, z, 0));
    }

    const innerCourtyard = addShadow(new THREE.Mesh(new THREE.BoxGeometry(108, 1.2, 112), MAT.marbleFloor));
    innerCourtyard.position.y = 0.6;
    templeModelGroup.add(innerCourtyard);

    // Bronze Tripodal Censers & Candle Offering Stands at Key Worship Points
    templeModelGroup.add(createBronzeCenserAltar(0, 1.2, 42.2, 1.05));
    templeModelGroup.add(createBronzeCenserAltar(-19.5, 1.2, -20.5, 0.95));
    templeModelGroup.add(createBronzeCenserAltar(-20.5, 5.6, -2.5, 0.90));

    // 1.5 OUTER GREEN LAWN, 3 CONICAL TOPIARY TREES & NEOCLASSICAL BUILDING
    const outerCourtLawn = addShadow(new THREE.Mesh(new THREE.BoxGeometry(28.0, 0.22, 54.0), MAT.lawnGrass));
    outerCourtLawn.position.set(-48.0, 1.15, -12.0);
    templeModelGroup.add(outerCourtLawn);

    [-32, -20, -4, 8].forEach(lz => {
      const lawnLamp = createVintageLampPost(0.82);
      lawnLamp.position.set(-41.2, 1.2, lz);
      templeModelGroup.add(lawnLamp);

      const shrub = createThaiTree(-40.5, 1.2, lz + 3.2, 0.44);
      templeModelGroup.add(shrub);
    });

    [13.5, 19.5, 25.5].forEach(cz => {
      templeModelGroup.add(createConicalTopiaryTree(-42.5, 1.2, cz, 1.15));
    });

    const neoclassicalHall = new THREE.Group();
    neoclassicalHall.position.set(-45.5, 1.2, 34.5);
    const ncBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(11.5, 8.8, 18.5), MAT.neoclassicalPalace));
    ncBody.position.y = 4.4;
    neoclassicalHall.add(ncBody);
    const ncRoof = addShadow(new THREE.Mesh(new THREE.ConeGeometry(8.8, 3.2, 4), MAT.whiteStucco));
    ncRoof.position.y = 10.4;
    ncRoof.rotation.y = Math.PI / 4;
    neoclassicalHall.add(ncRoof);
    templeModelGroup.add(neoclassicalHall);

    // 2. Outer White Crenellated Battlement Walls WITH Royal & National Flags
    function createBattlementWall(x1, z1, x2, z2) {
      const wallGroup = new THREE.Group();
      const dx = x2 - x1;
      const dz = z2 - z1;
      const len = Math.hypot(dx, dz);
      const angle = Math.atan2(dx, dz);

      const mainWall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.5, 4.8, len), MAT.whiteStucco));
      mainWall.position.y = 2.4;
      wallGroup.add(mainWall);

      const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.9, len), MAT.whiteStucco);
      basePlinth.position.y = 0.45;
      wallGroup.add(basePlinth);

      const moldingStrip = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.28, len), MAT.gold);
      moldingStrip.position.y = 4.2;
      wallGroup.add(moldingStrip);

      const count = Math.floor(len / 2.0);
      for (let i = 0; i <= count; i++) {
        const zPos = -len / 2 + i * (len / count);
        const merlon = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.95, 1.05), MAT.whiteStucco));
        merlon.position.set(0, 5.25, zPos);
        wallGroup.add(merlon);
        const cap = new THREE.Mesh(new THREE.ConeGeometry(0.68, 0.55, 4), MAT.whiteStucco);
        cap.position.set(0, 5.95, zPos);
        cap.rotation.y = Math.PI / 4;
        wallGroup.add(cap);

        if (i % 6 === 3) {
          const fPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.4, 6), MAT.brightGold);
          fPole.position.set(0, 6.4, zPos);
          wallGroup.add(fPole);
          const fColor = (i % 12 === 3) ? 0x38bdf8 : 0xfacc15;
          const fMat = new THREE.MeshStandardMaterial({ color: fColor, side: THREE.DoubleSide });
          const fMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.72), fMat);
          fMesh.position.set(0.55, 7.2, zPos);
          wallGroup.add(fMesh);
          animatedObjects.flags.push(fMesh);
        }
      }

      wallGroup.position.set((x1 + x2) / 2, 0.5, (z1 + z2) / 2);
      wallGroup.rotation.y = angle;
      return wallGroup;
    }

    templeModelGroup.add(createBattlementWall(-54, -56, 54, -56));
    templeModelGroup.add(createBattlementWall(-54, 56, 54, 56));
    templeModelGroup.add(createBattlementWall(-54, -56, -54, 56));
    templeModelGroup.add(createBattlementWall(54, -56, 54, 56));

    // 3. Octagonal Corner Bastion Forts
    function createCornerBastion(x, z) {
      const fort = new THREE.Group();
      const base = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.8, 6.4, 8), MAT.whiteStucco));
      base.position.y = 3.2;
      base.rotation.y = Math.PI / 8;
      fort.add(base);

      const trim = new THREE.Mesh(new THREE.CylinderGeometry(7.35, 7.35, 0.35, 8), MAT.gold);
      trim.position.y = 5.4;
      trim.rotation.y = Math.PI / 8;
      fort.add(trim);

      for (let a = 0; a < 8; a++) {
        const theta = (a / 8) * Math.PI * 2;
        const merlon = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.35, 1.15), MAT.whiteStucco));
        merlon.position.set(Math.sin(theta) * 6.2, 6.9, Math.cos(theta) * 6.2);
        merlon.rotation.y = theta;
        fort.add(merlon);
      }

      [[-2.2, 0xdc2626], [0, 0x1e3a8a], [2.2, 0x38bdf8]].forEach(([fx, fColor]) => {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 6.2, 6), MAT.whiteStucco);
        pole.position.set(fx, 9.2, 2.2);
        fort.add(pole);

        const flagMat = new THREE.MeshStandardMaterial({ color: fColor, side: THREE.DoubleSide });
        const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.1, 6, 2), flagMat);
        flag.position.set(fx + 0.9, 11.5, 2.2);
        fort.add(flag);
        animatedObjects.flags.push(flag);
      });

      fort.position.set(x, 0.5, z);
      return fort;
    }

    templeModelGroup.add(createCornerBastion(-54, 56));
    templeModelGroup.add(createCornerBastion(54, 56));
    templeModelGroup.add(createCornerBastion(-54, -56));
    templeModelGroup.add(createCornerBastion(54, -56));

    // 4. Ornate White Prang Entrance Gateways + Royal Guards
    function createGateTower(x, z, rotY, isGrandGate) {
      const gate = new THREE.Group();
      const s = isGrandGate ? 1.18 : 1.0;

      const body = addShadow(new THREE.Mesh(new THREE.BoxGeometry(7.2 * s, 7.6 * s, 4.8 * s), MAT.whiteStucco));
      body.position.y = 3.8 * s;
      gate.add(body);

      const door = new THREE.Mesh(new THREE.BoxGeometry(3.0 * s, 5.2 * s, 5.0 * s), MAT.redDoor);
      door.position.y = 2.6 * s;
      gate.add(door);

      const gateRoofNS = createThaiRoof(6.4 * s, 6.2 * s, 3.6 * s, 2, false, false);
      gateRoofNS.position.y = 7.4 * s;
      gate.add(gateRoofNS);

      const spire = createPrang(5.6 * s, 16.5 * s, MAT.whitePorcelain, MAT.brightGold);
      spire.position.y = 8.4 * s;
      gate.add(spire);

      [-2.4 * s, 2.4 * s].forEach(gx => {
        const guard = createPersonFigure({ role: 'guard', pose: 'walk', scale: 0.95 });
        guard.position.set(gx, 0.2, -3.2 * s);
        guard.rotation.y = Math.PI;
        gate.add(guard);
      });

      gate.position.set(x, 0.5, z);
      gate.rotation.y = rotY || 0;
      return gate;
    }

    templeModelGroup.add(createGateTower(0, -56, 0, true));
    templeModelGroup.add(createGateTower(-54, 22, Math.PI / 2, true));
    templeModelGroup.add(createGateTower(-54, -18, Math.PI / 2, false));
    templeModelGroup.add(createGateTower(54, 20, Math.PI / 2, true));
    templeModelGroup.add(createGateTower(54, -18, Math.PI / 2, false));

    // =========================================================================
    // 5. CLOISTER GALLERIES WITH OPEN PORTAL GATES & YAKSHA GUARDIANS
    //    (ซุ้มประตูพระระเบียงคดเปิดช่องทางเดินทะลุ ไม่ให้กำแพงบังมุมกล้องยักษ์!)
    // =========================================================================
    function createCloisterWing(x, z, width, length, rotY, leftYakColor, rightYakColor) {
      const seg = new THREE.Group();

      // Split wall into 2 halves leaving a 5.2-unit open portal doorway in the center!
      const halfLen = (length - 5.2) / 2;
      [-length / 4 - 1.3, length / 4 + 1.3].forEach(wz => {
        const wall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(width * 0.45, 5.0, halfLen), MAT.creamWall));
        wall.position.set(-width * 0.25, 2.5, wz);
        seg.add(wall);

        const muralWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.4, halfLen - 0.4), MAT.ramakienMural);
        muralWall.position.set(0.05, 2.4, wz);
        seg.add(muralWall);
      });

      const colCount = Math.floor(length / 3.8);
      for (let i = 0; i <= colCount; i++) {
        const zPos = -length / 2 + i * (length / colCount);
        if (Math.abs(zPos) < 2.4) continue;
        [-width * 0.58, width * 0.58].forEach(xEdge => {
          const p = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 4.8, 8), MAT.whiteStucco));
          p.position.set(xEdge, 2.4, zPos);
          seg.add(p);
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.65), MAT.brightGold);
          cap.position.set(xEdge, 4.75, zPos);
          seg.add(cap);
        });
      }

      const roof = createThaiRoof(width + 2.8, length + 1.8, 4.8, 2, false, true);
      roof.position.y = 5.0;
      seg.add(roof);

      const gatePorch = new THREE.Group();
      gatePorch.rotation.y = Math.PI / 2;

      [-1.58, 1.58].forEach(dx => {
        const doorLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.3, 1.6), MAT.redDoor);
        doorLeaf.position.set(dx, 2.15, width * 0.55);
        gatePorch.add(doorLeaf);
      });

      [-2.1, 2.1].forEach(px => {
        [-width * 0.72, width * 0.72].forEach(pz => {
          const sqPillar = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.82, 4.8, 0.82), MAT.whiteStucco));
          sqPillar.position.set(px, 2.4, pz);
          gatePorch.add(sqPillar);
          const goldCap = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.65, 1.02), MAT.brightGold);
          goldCap.position.set(px, 4.65, pz);
          gatePorch.add(goldCap);
        });

        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.35, 0.55, 6), MAT.whiteStucco);
        pot.position.set(px, 0.28, width * 0.72 + 0.95);
        gatePorch.add(pot);
        const bonsai = createThaiTree(px, 0.45, width * 0.72 + 0.95, 0.46);
        gatePorch.add(bonsai);
      });

      const crossRoof = createThaiRoof(6.8, width + 5.6, 4.8, 2, false, true);
      crossRoof.position.y = 4.9;
      gatePorch.add(crossRoof);

      const benjarongSpire = createPrang(4.6, 15.8, MAT.whitePorcelain, MAT.brightGold);
      benjarongSpire.position.set(0, 7.2, 0);
      gatePorch.add(benjarongSpire);

      const yakLeft = createYakshaGuardian(0.95, leftYakColor || 0xdc2626, '#b45309', true);
      yakLeft.position.set(-3.75, 0, width * 0.78 + 1.85);
      gatePorch.add(yakLeft);

      const yakRight = createYakshaGuardian(0.95, rightYakColor || 0x0f766e, '#ca8a04', true);
      yakRight.position.set(3.75, 0, width * 0.78 + 1.85);
      gatePorch.add(yakRight);

      seg.add(gatePorch);
      seg.position.set(x, 1.0, z);
      seg.rotation.y = rotY || 0;
      return seg;
    }

    templeModelGroup.add(createCloisterWing(0, -41, 5.4, 76, Math.PI / 2, 0xdc2626, 0x0f766e));
    templeModelGroup.add(createCloisterWing(0, 44, 5.4, 76, Math.PI / 2, 0x0f766e, 0xf8fafc));
    templeModelGroup.add(createCloisterWing(-37, 1.5, 5.4, 85, 0, 0x0f766e, 0xf8fafc));
    templeModelGroup.add(createCloisterWing(37, 1.5, 5.4, 85, 0, 0xdc2626, 0x1e3a8a));

    // 6. NORTHERN PRECINCT BUILDINGS & BRONZE BUDDHA HALL
    const monthianGroup = new THREE.Group();
    monthianGroup.position.set(0, 1.2, -31.5);
    const mtBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(13.2, 1.6, 23.5), MAT.whiteStucco));
    mtBase.position.y = 0.8;
    monthianGroup.add(mtBase);
    const mtBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(11.4, 6.8, 21.5), MAT.creamWall));
    mtBody.position.y = 4.2;
    monthianGroup.add(mtBody);
    const mtRoof = createThaiRoof(15.2, 24.8, 9.2, 3, false, true);
    mtRoof.position.y = 7.6;
    monthianGroup.add(mtRoof);
    templeModelGroup.add(monthianGroup);

    const wihanYot = new THREE.Group();
    wihanYot.name = 'Phra_Wihan_Yot_And_Bronze_Buddha_Hall';
    wihanYot.position.set(-19.5, 1.2, -30.5);

    const wyBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(13.2, 1.4, 16.5), MAT.whiteStucco));
    wyBase.position.y = 0.7;
    wihanYot.add(wyBase);

    [-5.8, 5.8].forEach(wx => {
      const sWall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.45, 7.2, 15.2), MAT.creamWall));
      sWall.position.set(wx, 4.8, 0);
      wihanYot.add(sWall);
    });
    const backCloudWall = new THREE.Mesh(new THREE.BoxGeometry(11.4, 7.2, 0.45), MAT.goldCloudWall);
    backCloudWall.position.set(0, 4.8, -7.4);
    wihanYot.add(backCloudWall);

    const redCeiling = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.25, 15.0), MAT.cofferedCeiling);
    redCeiling.position.set(0, 8.3, 0);
    wihanYot.add(redCeiling);

    const ceilingRosette = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.14, 18), MAT.brightGold);
    ceilingRosette.position.set(0, 8.2, -3.2);
    wihanYot.add(ceilingRosette);

    for (let sl = 0; sl < 6; sl++) {
      const sAng = (sl * Math.PI * 2) / 6;
      const starBulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), MAT.crystalGlow);
      starBulb.position.set(Math.sin(sAng) * 2.2, 8.15, -3.2 + Math.cos(sAng) * 1.8);
      wihanYot.add(starBulb);
    }

    [-2.85, 2.85].forEach(cx => {
      [-1.5, 3.8].forEach(cz => {
        const redGoldCol = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.58, 7.0, 16), MAT.redGoldColumn));
        redGoldCol.position.set(cx, 4.9, cz);
        wihanYot.add(redGoldCol);

        const colGoldBase = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.72, 1.1, 14), MAT.brightGold);
        colGoldBase.position.set(cx, 1.95, cz);
        wihanYot.add(colGoldBase);
      });
    });

    const goldSpandrel = addShadow(new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.15, 0.28), MAT.gableGold));
    goldSpandrel.position.set(0, 7.65, 3.8);
    wihanYot.add(goldSpandrel);

    const viharnAltar1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.25, 4.0), MAT.redGoldColumn));
    viharnAltar1.position.set(0, 2.0, -4.2);
    wihanYot.add(viharnAltar1);
    const viharnAltar2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.95, 3.4), MAT.brightGold));
    viharnAltar2.position.set(0, 3.1, -4.2);
    wihanYot.add(viharnAltar2);

    const toranaArch = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.25, 0.22, 18), MAT.brightGold);
    toranaArch.rotation.x = Math.PI / 2;
    toranaArch.position.set(0, 5.2, -5.8);
    wihanYot.add(toranaArch);

    const presidingBronzeBuddha = createBronzeMaraVijayaBuddha(1.15);
    presidingBronzeBuddha.position.set(0, 3.58, -4.2);
    wihanYot.add(presidingBronzeBuddha);

    const goldCylCanopy = new THREE.Group();
    goldCylCanopy.position.set(0, 7.35, -4.0);
    const cTier1 = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.45, 16), MAT.brightGold);
    goldCylCanopy.add(cTier1);
    const cTier2 = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.42, 16), MAT.brightGold);
    cTier2.position.y = 0.42;
    goldCylCanopy.add(cTier2);
    wihanYot.add(goldCylCanopy);

    const viharnSpot = new THREE.PointLight(0xffb703, 2.2, 18);
    viharnSpot.position.set(0, 6.8, -0.5);
    wihanYot.add(viharnSpot);

    [-2.05, 2.05].forEach(bx => {
      const sidePedestal = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.88, 0.34, 16), MAT.brightGold));
      sidePedestal.position.set(bx, 3.75, -3.55);
      wihanYot.add(sidePedestal);

      const sideBuddha = createBronzeMaraVijayaBuddha(0.52);
      sideBuddha.position.set(bx, 3.92, -3.55);
      wihanYot.add(sideBuddha);
    });

    [-3.4, 3.4].forEach(tx => {
      for (let t = 0; t < 7; t++) {
        const r = 0.42 - t * 0.045;
        const cone = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.75, r, 0.32, 10), MAT.pearlCanopy);
        cone.position.set(tx, 2.2 + t * 0.36, -3.2);
        wihanYot.add(cone);
      }
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.85, 8), MAT.brightGold);
      spire.position.set(tx, 4.95, -3.2);
      wihanYot.add(spire);
    });

    const goldTable = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.95, 1.4), MAT.brightGold);
    goldTable.position.set(0, 1.85, -1.8);
    wihanYot.add(goldTable);

    [-1.85, 1.85].forEach(fx => {
      const redPed = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.28, 0.85, 10), MAT.redDoor);
      redPed.position.set(fx, 1.8, -1.6);
      wihanYot.add(redPed);
      const pinkBouquet = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.35, 10), MAT.pinkElephant);
      pinkBouquet.position.set(fx, 2.85, -1.6);
      wihanYot.add(pinkBouquet);
    });
    [-0.95, 0.95].forEach(wx => {
      const whiteBouquet = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.05, 10), MAT.whiteStucco);
      whiteBouquet.position.set(wx, 2.75, -2.1);
      wihanYot.add(whiteBouquet);
    });

    const wyRoofNS = createThaiRoof(13.6, 17.2, 6.6, 2, false, true);
    wyRoofNS.position.y = 8.4;
    wihanYot.add(wyRoofNS);
    const wyRoofEW = createThaiRoof(12.2, 14.5, 6.2, 2, false, false);
    wyRoofEW.position.y = 8.4;
    wyRoofEW.rotation.y = Math.PI / 2;
    wihanYot.add(wyRoofEW);
    const wyCrown = createPrang(5.4, 15.8, MAT.whitePorcelain, MAT.brightGold);
    wyCrown.position.y = 11.6;
    wihanYot.add(wyCrown);

    templeModelGroup.add(wihanYot);

    const hoPhraNak = new THREE.Group();
    hoPhraNak.position.set(20.5, 1.2, -30.5);
    const hnBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(11.5, 6.4, 15.8), MAT.creamWall));
    hnBody.position.y = 3.2;
    hoPhraNak.add(hnBody);
    const hnRoof = createThaiRoof(14.2, 18.2, 7.4, 3, false, true);
    hnRoof.position.y = 6.4;
    hoPhraNak.add(hnRoof);
    templeModelGroup.add(hoPhraNak);

    const bellTower = new THREE.Group();
    bellTower.position.set(19.5, 1.2, 4.5);
    const btBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.8, 5.2), MAT.whiteStucco));
    btBase.position.y = 1.9;
    bellTower.add(btBase);
    [-1.8, 1.8].forEach(bx => {
      [-1.8, 1.8].forEach(bz => {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 4.8, 8), MAT.gold);
        p.position.set(bx, 6.2, bz);
        bellTower.add(p);
      });
    });
    const bell = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.4, 12), MAT.brightGold);
    bell.position.y = 6.4;
    bellTower.add(bell);
    const btSpire = createPrang(4.6, 13.5, MAT.whitePorcelain, MAT.brightGold);
    btSpire.position.y = 8.6;
    bellTower.add(btSpire);
    templeModelGroup.add(bellTower);

    [
      [-11.5, -20.5], [11.5, -20.5], [-28.5, -20.5], [28.5, -20.5],
      [-32.0, 12.0], [32.0, 12.0], [-32.0, 28.0], [32.0, 28.0]
    ].forEach(([lx, lz]) => {
      templeModelGroup.add(createLotusBasin(lx, 1.2, lz, 1.1));
    });

    // 7. EIGHT GLAZED-TILE PRANGS
    const prangPalettes = [
      ['#ffffff', '#0284c7'],
      ['#fef08a', '#d97706'],
      ['#bae6fd', '#1d4ed8'],
      ['#fde68a', '#b45309'],
      ['#fecdd3', '#be123c'],
      ['#fed7aa', '#c2410c'],
      ['#ddd6fe', '#6d28d9'],
      ['#f1f5f9', '#0369a1']
    ];
    for (let i = 0; i < 8; i++) {
      const zPos = -33.25 + i * 9.5;
      const [baseHex, accentHex] = prangPalettes[i];
      const pMat = new THREE.MeshStandardMaterial({
        map: createPorcelainPrangTexture(baseHex, accentHex),
        roughness: 0.24,
        metalness: 0.22,
        envMap: window.WPKTextures.envMap,
        envMapIntensity: 0.78
      });
      allMaterials.push(pMat);
      const prang8 = createPrang(5.8, 24.5, pMat, MAT.brightGold);
      prang8.position.set(45.8, 1.0, zPos);
      templeModelGroup.add(prang8);
    }

    // 8. SURROUNDING GRAND PALACE, HERITAGE COLONIAL SHOPHOUSES, CITY PILLAR, SANAM LUANG & THA CHANG
    const surroundingsGroup = new THREE.Group();
    surroundingsGroup.name = 'Grand_Palace_And_Surrounding_Buildings';

    const chakriGroup = new THREE.Group();
    chakriGroup.position.set(-18, 0.8, 72);
    const ckBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(36, 11.5, 13), MAT.palaceCream));
    ckBody.position.y = 5.75;
    chakriGroup.add(ckBody);

    for (let cx = -15; cx <= 15; cx += 3) {
      const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.55, 11.2, 13.4), MAT.whiteStucco);
      pilaster.position.set(cx, 5.75, 0);
      chakriGroup.add(pilaster);
    }
    const ckRoof = createThaiRoof(38, 15, 7.2, 2, false, true);
    ckRoof.position.y = 11.5;
    ckRoof.rotation.y = Math.PI / 2;
    chakriGroup.add(ckRoof);

    [-11, 0, 11].forEach((sx, idx) => {
      const h = idx === 1 ? 15.5 : 12.8;
      const spire = createPrang(4.5, h, MAT.brightGold, MAT.brightGold);
      spire.position.set(sx, 14.2, 0);
      chakriGroup.add(spire);
    });
    surroundingsGroup.add(chakriGroup);

    const dusitGroup = new THREE.Group();
    dusitGroup.position.set(-40, 0.8, 72);
    const dsNS = addShadow(new THREE.Mesh(new THREE.BoxGeometry(8.5, 8.2, 18), MAT.whiteStucco));
    dsNS.position.y = 4.1;
    dusitGroup.add(dsNS);
    const dsEW = addShadow(new THREE.Mesh(new THREE.BoxGeometry(18, 8.2, 8.5), MAT.whiteStucco));
    dsEW.position.y = 4.1;
    dusitGroup.add(dsEW);
    const dsRoof1 = createThaiRoof(10.5, 19.5, 6.8, 2, false, false);
    dsRoof1.position.y = 8.2;
    dusitGroup.add(dsRoof1);
    const dsRoof2 = createThaiRoof(10.5, 19.5, 6.8, 2, false, false);
    dsRoof2.position.y = 8.2;
    dsRoof2.rotation.y = Math.PI / 2;
    dusitGroup.add(dsRoof2);
    const dsSpire = createPrang(4.8, 15.5, MAT.brightGold, MAT.brightGold);
    dsSpire.position.y = 11.2;
    dusitGroup.add(dsSpire);
    surroundingsGroup.add(dusitGroup);

    const amarindra = new THREE.Group();
    amarindra.position.set(16, 0.8, 70);
    const amBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(16, 8.5, 22), MAT.palaceCream));
    amBody.position.y = 4.25;
    amarindra.add(amBody);
    const amRoof = createThaiRoof(18.5, 24, 7.8, 2, false, true);
    amRoof.position.y = 8.5;
    amarindra.add(amRoof);
    surroundingsGroup.add(amarindra);

    [
      [-105.5, 42, 9.2, 18.0],
      [-105.5, 20, 9.2, 18.0],
      [-105.5, -2, 9.2, 18.0]
    ].forEach(([px, pz, pw, pl]) => {
      const shophouse = new THREE.Group();
      const body = addShadow(new THREE.Mesh(new THREE.BoxGeometry(pw, 6.4, pl), MAT.heritageFacade));
      body.position.y = 3.2;
      shophouse.add(body);

      const roof = createThaiRoof(pw + 1.6, pl + 1.2, 3.8, 1, false, false);
      roof.position.y = 6.4;
      shophouse.add(roof);

      shophouse.position.set(px, 0.4, pz);
      surroundingsGroup.add(shophouse);
    });

    const busStopShelter = new THREE.Group();
    busStopShelter.position.set(-65.5, 0.4, -6.0);
    [-2.8, 2.8].forEach(bz => {
      const bCol = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.2, 8), MAT.redDoor));
      bCol.position.set(0, 1.6, bz);
      busStopShelter.add(bCol);
    });
    const bBench = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.45, 4.4), MAT.teakWoodColumn);
    bBench.position.set(0.2, 0.45, 0);
    busStopShelter.add(bBench);
    const bRoof = createThaiRoof(2.8, 6.8, 1.8, 1, false, false);
    bRoof.position.set(0, 3.2, 0);
    busStopShelter.add(bRoof);
    surroundingsGroup.add(busStopShelter);

    const parkedTukTuk1 = createThaiTukTuk(0x1d4ed8, 1);
    parkedTukTuk1.position.set(-70.2, 0.15, -13.0);
    surroundingsGroup.add(parkedTukTuk1);

    const parkedTukTuk2 = createThaiTukTuk(0xdc2626, 1);
    parkedTukTuk2.position.set(-70.2, 0.15, -17.5);
    surroundingsGroup.add(parkedTukTuk2);

    const parkedTukTuk3 = createThaiTukTuk(0x16a34a, 1);
    parkedTukTuk3.position.set(-70.2, 0.15, -22.0);
    surroundingsGroup.add(parkedTukTuk3);

    const ministry = new THREE.Group();
    ministry.position.set(104, 0.4, 18);
    const minBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(18, 10.5, 58), MAT.heritageFacade));
    minBody.position.y = 5.25;
    ministry.add(minBody);
    const minRoof = addShadow(new THREE.Mesh(new THREE.BoxGeometry(19.2, 2.2, 59.2), MAT.roofGreyThai));
    minRoof.position.y = 11.2;
    ministry.add(minRoof);
    surroundingsGroup.add(ministry);

    const cityPillar = new THREE.Group();
    cityPillar.position.set(104, 0.4, -46);
    const cpWall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(20, 2.6, 20), MAT.whiteStucco));
    cpWall.position.y = 1.3;
    cityPillar.add(cpWall);
    const cpHall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(9.5, 6.2, 9.5), MAT.whiteStucco));
    cpHall.position.y = 4.4;
    cityPillar.add(cpHall);
    const cpRoof1 = createThaiRoof(11.2, 12.5, 5.4, 2, false, false);
    cpRoof1.position.y = 7.5;
    cityPillar.add(cpRoof1);
    const cpRoof2 = createThaiRoof(11.2, 12.5, 5.4, 2, false, false);
    cpRoof2.position.y = 7.5;
    cpRoof2.rotation.y = Math.PI / 2;
    cityPillar.add(cpRoof2);
    const cpPrang = createPrang(4.8, 14.5, MAT.whitePorcelain, MAT.brightGold);
    cpPrang.position.y = 9.8;
    cityPillar.add(cpPrang);
    surroundingsGroup.add(cityPillar);

    const sanamLuang = new THREE.Group();
    sanamLuang.position.set(0, 0.1, -114);
    const slCurb = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(42, 42, 0.45, 32), MAT.sidewalk));
    slCurb.scale.set(1.35, 1.0, 0.65);
    sanamLuang.add(slCurb);
    const slLawn = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(39, 39, 0.55, 32), MAT.lawnGrass));
    slLawn.scale.set(1.35, 1.0, 0.65);
    sanamLuang.add(slLawn);
    for (let a = 0; a < 16; a++) {
      const ang = (a * Math.PI * 2) / 16;
      sanamLuang.add(createThaiTree(Math.sin(ang) * 51, 0.3, Math.cos(ang) * 24.5, 1.05));
    }
    surroundingsGroup.add(sanamLuang);

    const thaChang = new THREE.Group();
    thaChang.position.set(-116, 0.4, -28);
    const pierDeck = addShadow(new THREE.Mesh(new THREE.BoxGeometry(12, 0.8, 28), MAT.whiteStucco));
    pierDeck.position.y = 0.4;
    thaChang.add(pierDeck);
    [-8, 8].forEach(pz => {
      const pPav = addShadow(new THREE.Mesh(new THREE.BoxGeometry(8.5, 4.5, 9.5), MAT.heritageFacade));
      pPav.position.set(0, 2.6, pz);
      thaChang.add(pPav);
      const pRoof = createThaiRoof(10.2, 11.2, 4.2, 2, false, false);
      pRoof.position.set(0, 4.9, pz);
      thaChang.add(pRoof);
    });
    surroundingsGroup.add(thaChang);

    templeModelGroup.add(surroundingsGroup);

    // 9. Royal Three-Headed Pink/White Elephant Monument
    const elephantMonument = new THREE.Group();
    elephantMonument.position.set(-42, 0.2, 72);
    const emPed = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.5, 2.2, 8), MAT.whiteStucco));
    emPed.position.y = 1.1;
    elephantMonument.add(emPed);
    const emSpire = createPrang(2.8, 8.5, MAT.brightGold, MAT.brightGold);
    emSpire.position.y = 2.2;
    elephantMonument.add(emSpire);

    for (let e = 0; e < 3; e++) {
      const ang = (e * Math.PI * 2) / 3;
      const el = new THREE.Group();
      const eBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.8, 2.4), MAT.pinkElephant));
      eBody.position.y = 2.8;
      el.add(eBody);
      const eCloth = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.4), MAT.brightGold);
      eCloth.position.y = 3.1;
      el.add(eCloth);
      const eHead = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 10), MAT.pinkElephant);
      eHead.position.set(0, 3.3, 1.35);
      el.add(eHead);
      el.position.set(Math.sin(ang) * 2.4, 0, Math.cos(ang) * 2.4);
      el.rotation.y = ang;
      elephantMonument.add(el);
    }
    templeModelGroup.add(elephantMonument);

    // 10. Trees
    const treeCoords = [
      [-46, -46], [-46, 46],
      [-26, -48], [-12, -48], [12, -48], [26, -48],
      [-28, 50], [-14, 50], [14, 50], [28, 50],
      [-61, -36], [-61, -14], [-61, 14],
      [62, -36], [62, 0], [62, 36]
    ];
    treeCoords.forEach(([tx, tz]) => {
      templeModelGroup.add(createThaiTree(tx, 0.8, tz, 1.15));
    });

    for (let z = -37; z <= -20; z += 4.2) {
      templeModelGroup.add(createThaiTree(-8.5, 1.2, z, 0.55));
      templeModelGroup.add(createThaiTree(8.5, 1.2, z, 0.55));
    }

    // 11. ANIMATED FLEET OF 3D BANGKOK BUSES, TUK-TUKS, TAXIS & CHAO PHRAYA BOATS
    const trafficConfigs = [
      { kind: 'bus', euro: false, axis: 'z', laneX: -75.0, zStart: -40, dir: 1, speed: 0.13 },
      { kind: 'bus', euro: true,  axis: 'z', laneX: -87.0, zStart: 28,  dir: -1, speed: 0.14 },
      { kind: 'bus', euro: false, axis: 'z', laneX: -75.0, zStart: 38,  dir: 1, speed: 0.12 },
      { kind: 'tuktuk', color: 0x1d4ed8, axis: 'z', laneX: -79.8, zStart: -8,  dir: 1, speed: 0.21 },
      { kind: 'tuktuk', color: 0xdc2626, axis: 'z', laneX: -91.5, zStart: -24, dir: -1, speed: 0.22 },
      { kind: 'tuktuk', color: 0x16a34a, axis: 'z', laneX: -79.8, zStart: 18,  dir: 1, speed: 0.20 },
      { kind: 'tuktuk', color: 0xdb2777, axis: 'z', laneX: -91.5, zStart: 52,  dir: -1, speed: 0.23 },
      { kind: 'tuktuk', color: 0xeab308, axis: 'z', laneX: -79.8, zStart: 62,  dir: 1, speed: 0.22 },
      { kind: 'taxi', lowColor: 0x16a34a, upColor: 0xfacc15, axis: 'z', laneX: -79.8, zStart: -58, dir: 1, speed: 0.25 },
      { kind: 'taxi', lowColor: 0xec4899, upColor: 0xec4899, axis: 'z', laneX: -87.0, zStart: -5,  dir: -1, speed: 0.24 },
      { kind: 'taxi', lowColor: 0x1d4ed8, upColor: 0xdc2626, axis: 'z', laneX: -91.5, zStart: 15,  dir: -1, speed: 0.25 },

      { kind: 'bus', euro: false, axis: 'z', laneX: 73.5, zStart: -28, dir: 1, speed: 0.14 },
      { kind: 'bus', euro: true,  axis: 'z', laneX: 84.5, zStart: 38,  dir: -1, speed: 0.13 },
      { kind: 'tuktuk', color: 0x1d4ed8, axis: 'z', laneX: 78.0, zStart: 12,  dir: 1, speed: 0.22 },
      { kind: 'tuktuk', color: 0xeab308, axis: 'z', laneX: 88.5, zStart: -15, dir: -1, speed: 0.21 },
      { kind: 'taxi', lowColor: 0x16a34a, upColor: 0xfacc15, axis: 'z', laneX: 78.0, zStart: -50, dir: 1, speed: 0.24 },

      { kind: 'bus', euro: true,  axis: 'x', laneZ: -74.0, xStart: -35, dir: 1, speed: 0.13 },
      { kind: 'bus', euro: false, axis: 'x', laneZ: -83.5, xStart: 42,  dir: -1, speed: 0.12 },
      { kind: 'tuktuk', color: 0xdc2626, axis: 'x', laneZ: -74.0, xStart: 10,  dir: 1, speed: 0.21 },
      { kind: 'tuktuk', color: 0x1d4ed8, axis: 'x', laneZ: -83.5, xStart: 25,  dir: -1, speed: 0.22 },
      { kind: 'taxi', lowColor: 0xec4899, upColor: 0xec4899, axis: 'x', laneZ: -83.5, xStart: -20, dir: -1, speed: 0.24 },

      // Chao Phraya River Boats (เรือด่วนเจ้าพระยาธงส้ม และ เรือหางยาวไทย)
      { kind: 'boat', express: true,  axis: 'z', laneX: -133.0, zStart: -45, dir: 1,  speed: 0.10 },
      { kind: 'boat', express: false, axis: 'z', laneX: -146.0, zStart: 25,  dir: -1, speed: 0.16 },
      { kind: 'boat', express: false, axis: 'z', laneX: -139.0, zStart: 5,   dir: 1,  speed: 0.14 }
    ];

    trafficConfigs.forEach(cfg => {
      let vGroup;
      if (cfg.kind === 'bus') {
        vGroup = createBangkokBus(cfg.euro, cfg.dir);
      } else if (cfg.kind === 'tuktuk') {
        vGroup = createThaiTukTuk(cfg.color, cfg.dir);
      } else if (cfg.kind === 'boat') {
        vGroup = createChaoPhrayaBoat(cfg.express, cfg.dir);
      } else {
        vGroup = createBangkokTaxi(cfg.lowColor, cfg.upColor, cfg.dir);
      }

      if (cfg.axis === 'x') {
        vGroup.rotation.y = Math.PI / 2;
        vGroup.position.set(cfg.xStart, 0.05, cfg.laneZ);
      } else {
        vGroup.position.set(cfg.laneX, cfg.kind === 'boat' ? 0.0 : 0.05, cfg.zStart);
      }
      templeModelGroup.add(vGroup);
      animatedObjects.vehicles.push({ mesh: vGroup, spec: cfg });
    });

    // 12. 70+ DETAILED 3D PEOPLE, TOUR GROUPS WITH GUIDES, MONKS & WORSHIPPERS
    const staticPeopleSpecs = [
      // Bus Stop & Tuk-Tuk Boarding Zone on Maharaj Road
      { x: -66.0, y: 0.45, z: -4.2, rotY: -Math.PI / 2, role: 'tourist', pose: 'walk', shirtColor: 0xef4444, hat: true },
      { x: -66.0, y: 0.45, z: -6.5, rotY: -Math.PI / 2, role: 'tourist', pose: 'umbrella', shirtColor: 0x3b82f6, umbrellaColor: 0xf43f5e },
      { x: -66.0, y: 0.45, z: -8.5, rotY: -Math.PI / 2, role: 'tourist', pose: 'photo', shirtColor: 0x8b5cf6, hat: true },
      { x: -68.2, y: 0.45, z: -13.0, rotY: -Math.PI / 2, role: 'tourist', pose: 'photo', shirtColor: 0x10b981, hat: true },
      { x: -68.2, y: 0.45, z: -16.8, rotY: -Math.PI / 2, role: 'tourist', pose: 'walk', shirtColor: 0xf59e0b },
      { x: -68.2, y: 0.45, z: -21.5, rotY: -Math.PI / 2, role: 'guide',   pose: 'guide', shirtColor: 0xeab308, hat: true },

      // North Yaksha Gate (Suriyaphop & Inthrachit) Tour Group & Photographers
      { x: -2.2, y: 1.2, z: -49.5, rotY: 0.15,  role: 'guide',   pose: 'guide', shirtColor: 0xf97316, hat: true },
      { x: 0.0,  y: 1.2, z: -50.8, rotY: 0.0,   role: 'tourist', pose: 'photo', shirtColor: 0x0284c7, hat: true },
      { x: 2.1,  y: 1.2, z: -50.2, rotY: -0.15, role: 'tourist', pose: 'umbrella', shirtColor: 0xec4899, umbrellaColor: 0x38bdf8 },
      { x: -3.8, y: 1.2, z: -51.0, rotY: 0.25,  role: 'tourist', pose: 'photo', shirtColor: 0x10b981 },

      // Inner Courtyard in front of Thotsakan (Green) & Sahatsadecha (White) Yakshas (x = -25, z = 1.5)
      { x: -25.2, y: 1.2, z: -1.2, rotY: -Math.PI / 2, role: 'tourist', pose: 'photo', shirtColor: 0x2563eb, hat: true },
      { x: -25.6, y: 1.2, z: 3.8,  rotY: -Math.PI / 2, role: 'tourist', pose: 'umbrella', shirtColor: 0xf43f5e, umbrellaColor: 0xfacc15 },
      { x: -24.5, y: 1.2, z: 5.2,  rotY: -Math.PI / 2, role: 'guide',   pose: 'guide', shirtColor: 0x14b8a6, hat: true },

      // Outer Green Lawn Panorama Tourists
      { x: -45.5, y: 1.35, z: 0.8,   rotY: Math.PI / 2, role: 'tourist', pose: 'photo', shirtColor: 0x2563eb, hat: true },
      { x: -48.0, y: 1.35, z: -8.5,  rotY: 1.2,         role: 'tourist', pose: 'umbrella', shirtColor: 0xf59e0b, umbrellaColor: 0xec4899 },
      { x: -46.5, y: 1.35, z: -10.2, rotY: 1.2,         role: 'tourist', pose: 'photo', shirtColor: 0x6366f1, hat: true },

      // Front of Prasat Phra Thep Bidon & Twin Golden Chedis
      { x: 38.5, y: 1.2, z: -12.0, rotY: -Math.PI / 2, role: 'tourist', pose: 'photo', shirtColor: 0xec4899, hat: true },
      { x: 37.8, y: 1.2, z: -9.5,  rotY: -Math.PI / 2, role: 'tourist', pose: 'umbrella', shirtColor: 0x0ea5e9, umbrellaColor: 0xa855f7 },
      { x: 39.2, y: 1.2, z: -14.5, rotY: -Math.PI / 2, role: 'monk',    pose: 'wai' },
      { x: 36.5, y: 1.2, z: -16.8, rotY: -Math.PI / 2, role: 'guide',   pose: 'guide', shirtColor: 0x22c55e, hat: true },
      { x: 38.0, y: 1.2, z: -18.2, rotY: -Math.PI / 2, role: 'tourist', pose: 'walk',  shirtColor: 0xef4444, hat: true },

      // Upper Terrace Deck
      { x: -12.5, y: 5.65, z: -12.0, rotY: -Math.PI / 2, role: 'tourist', pose: 'photo', shirtColor: 0x3b82f6, hat: true },
      { x: -10.8, y: 5.65, z: -9.5,  rotY: -Math.PI / 2, role: 'worshipper', pose: 'wai' },
      { x: -4.5,  y: 5.65, z: -21.5, rotY: 0,            role: 'tourist', pose: 'photo', shirtColor: 0xf97316, hat: true },
      { x: 4.5,   y: 5.65, z: -21.5, rotY: 0,            role: 'monk',    pose: 'walk' },
      { x: 11.5,  y: 5.65, z: -12.0, rotY: Math.PI / 2,  role: 'worshipper', pose: 'wai' },

      // Front & Courtyard of Phra Ubosot & Sema Pavilions
      { x: -18.5, y: 1.2, z: 44.5, rotY: 2.5,     role: 'tourist', pose: 'photo', shirtColor: 0x14b8a6, hat: true },
      { x: -16.8, y: 1.2, z: 45.2, rotY: 2.5,     role: 'tourist', pose: 'umbrella', shirtColor: 0xf97316, umbrellaColor: 0x38bdf8 },
      { x: -20.2, y: 1.2, z: 46.0, rotY: 2.5,     role: 'guide',   pose: 'guide', shirtColor: 0xeab308, hat: true },
      { x: 0.0,   y: 1.2, z: 40.5, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: 1.8,   y: 1.2, z: 40.8, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: -1.8,  y: 1.2, z: 40.8, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: 16.5,  y: 1.2, z: 32.0, rotY: -1.8,    role: 'tourist', pose: 'photo', shirtColor: 0xec4899, hat: true },

      // Paying homage inside Phra Ubosot & inside Phra Wihan Yot
      { x: -1.8,  y: 4.4, z: 22.0, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: 0.0,   y: 4.4, z: 22.8, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: 1.8,   y: 4.4, z: 22.0, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: -19.5, y: 2.6, z: -27.5, rotY: Math.PI, role: 'worshipper', pose: 'wai' },
      { x: -21.0, y: 2.6, z: -26.8, rotY: Math.PI, role: 'worshipper', pose: 'wai' }
    ];

    staticPeopleSpecs.forEach(sp => {
      const fig = createPersonFigure(sp);
      fig.position.set(sp.x, sp.y, sp.z);
      fig.rotation.y = sp.rotY || 0;
      templeModelGroup.add(fig);
    });

    const walkerRoutes = [
      { axis: 'x', y: 1.25, z: 6.2,   min: -28, max: 28, pos: -22, dir: 1,  speed: 0.035, role: 'guide',   shirtColor: 0xef4444, hat: true, pose: 'guide' },
      { axis: 'x', y: 1.25, z: 6.5,   min: -28, max: 28, pos: -18, dir: 1,  speed: 0.035, role: 'tourist', shirtColor: 0x3b82f6, hat: true, pose: 'walk' },
      { axis: 'x', y: 1.25, z: 6.8,   min: -28, max: 28, pos: -15, dir: 1,  speed: 0.035, role: 'tourist', shirtColor: 0x10b981, pose: 'umbrella', umbrellaColor: 0xf43f5e },
      { axis: 'x', y: 1.25, z: 5.8,   min: -28, max: 28, pos: 12,  dir: -1, speed: 0.032, role: 'tourist', shirtColor: 0xec4899, pose: 'umbrella', umbrellaColor: 0xfacc15 },
      { axis: 'x', y: 1.25, z: 6.2,   min: -28, max: 28, pos: 20,  dir: -1, speed: 0.034, role: 'worshipper', pose: 'walk' },

      { axis: 'x', y: 1.25, z: -30.2, min: -26, max: 26, pos: -14, dir: 1,  speed: 0.030, role: 'monk',    pose: 'walk' },
      { axis: 'x', y: 1.25, z: -29.8, min: -26, max: 26, pos: -10, dir: 1,  speed: 0.030, role: 'monk',    pose: 'walk' },
      { axis: 'x', y: 1.25, z: -30.5, min: -26, max: 26, pos: 16,  dir: -1, speed: 0.034, role: 'tourist', shirtColor: 0x10b981, hat: true, pose: 'walk' },

      { axis: 'x', y: 5.65, z: -2.2,  min: -26, max: 26, pos: -14, dir: 1,  speed: 0.028, role: 'tourist', shirtColor: 0xf97316, hat: true, pose: 'walk' },
      { axis: 'x', y: 5.65, z: -2.6,  min: -26, max: 26, pos: 8,   dir: -1, speed: 0.030, role: 'tourist', shirtColor: 0x06b6d4, pose: 'umbrella', umbrellaColor: 0xa855f7 },
      { axis: 'x', y: 5.65, z: -21.5, min: -26, max: 26, pos: 15,  dir: -1, speed: 0.030, role: 'worshipper', pose: 'wai' },
      { axis: 'x', y: 5.65, z: -21.0, min: -26, max: 26, pos: -8,  dir: 1,  speed: 0.029, role: 'monk',    pose: 'walk' },

      { axis: 'z', y: 1.25, x: -30.5, min: -36, max: 38, pos: -22, dir: 1,  speed: 0.036, role: 'tourist', shirtColor: 0x8b5cf6, hat: true, pose: 'walk' },
      { axis: 'z', y: 1.25, x: -29.8, min: -36, max: 38, pos: 5,   dir: -1, speed: 0.032, role: 'monk',    pose: 'walk' },
      { axis: 'z', y: 1.25, x: -31.2, min: -36, max: 38, pos: 26,  dir: -1, speed: 0.034, role: 'tourist', shirtColor: 0xeab308, pose: 'umbrella', umbrellaColor: 0x3b82f6 },
      { axis: 'z', y: 1.25, x: 30.5,  min: -36, max: 38, pos: -18, dir: 1,  speed: 0.034, role: 'tourist', shirtColor: 0x06b6d4, pose: 'umbrella', umbrellaColor: 0xf43f5e },
      { axis: 'z', y: 1.25, x: 31.2,  min: -36, max: 38, pos: 10,  dir: -1, speed: 0.033, role: 'worshipper', pose: 'walk' },
      { axis: 'z', y: 1.25, x: 29.8,  min: -36, max: 38, pos: 30,  dir: -1, speed: 0.035, role: 'tourist', shirtColor: 0xef4444, hat: true, pose: 'walk' },

      { axis: 'z', y: 1.35, x: -44.0, min: -34, max: 10, pos: -25, dir: 1,  speed: 0.032, role: 'tourist', shirtColor: 0xec4899, hat: true, pose: 'walk' },
      { axis: 'z', y: 1.35, x: -43.2, min: -34, max: 10, pos: 4,   dir: -1, speed: 0.030, role: 'tourist', shirtColor: 0x3b82f6, pose: 'umbrella', umbrellaColor: 0xfacc15 },

      { axis: 'z', y: 0.45, x: -66.2, min: -52, max: 52, pos: -32, dir: 1,  speed: 0.038, role: 'tourist', shirtColor: 0xef4444, hat: true, pose: 'walk' },
      { axis: 'z', y: 0.45, x: -67.0, min: -52, max: 52, pos: -8,  dir: 1,  speed: 0.036, role: 'guide',   shirtColor: 0x10b981, hat: true, pose: 'guide' },
      { axis: 'z', y: 0.45, x: -66.5, min: -52, max: 52, pos: 14,  dir: -1, speed: 0.035, role: 'tourist', shirtColor: 0xeab308, pose: 'walk' },
      { axis: 'z', y: 0.45, x: -66.0, min: -52, max: 52, pos: 38,  dir: -1, speed: 0.032, role: 'tourist', shirtColor: 0x3b82f6, pose: 'umbrella', umbrellaColor: 0x10b981 },
      { axis: 'x', y: 0.45, z: -66.2, min: -48, max: 48, pos: -20, dir: 1,  speed: 0.036, role: 'tourist', shirtColor: 0xf97316, hat: true, pose: 'walk' },
      { axis: 'x', y: 0.45, z: -66.8, min: -48, max: 48, pos: 22,  dir: -1, speed: 0.034, role: 'worshipper', pose: 'walk' },
      { axis: 'z', y: 0.45, x: 66.2,  min: -48, max: 48, pos: -15, dir: 1,  speed: 0.035, role: 'tourist', shirtColor: 0x8b5cf6, hat: true, pose: 'walk' },
      { axis: 'z', y: 0.45, x: 66.8,  min: -48, max: 48, pos: 28,  dir: -1, speed: 0.033, role: 'monk',    pose: 'walk' }
    ];

    walkerRoutes.forEach((wr, idx) => {
      const fig = createPersonFigure(wr);
      if (wr.axis === 'x') {
        fig.position.set(wr.pos, wr.y, wr.z);
        fig.rotation.y = wr.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else {
        fig.position.set(wr.x, wr.y, wr.pos);
        fig.rotation.y = wr.dir > 0 ? 0 : Math.PI;
      }
      templeModelGroup.add(fig);
      animatedObjects.walkers.push({ mesh: fig, spec: wr, phase: idx * 0.85 });
    });

    return animatedObjects;
  }

  return { buildPrecinctAndSurroundings };
})();
