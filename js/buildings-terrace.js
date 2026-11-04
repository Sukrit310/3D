// ============================================================================
// MODULE 4: UPPER TERRACE (ฐานไพที) - PANTHEON PORTICO, CARYATID CHEDIS,
//           DETAILED ANGKOR WAT MODEL, RED CARPET & CHINESE STONE GUARDIANS
// ============================================================================

window.WPKTerrace = (function () {
  const { MAT } = window.WPKTextures;
  const {
    addShadow,
    createThaiRoof,
    createChedi,
    createRedentedGoldenChedi,
    createPrang,
    createYakshaGuardian,
    createPhumKhaoBinPinnacle,
    createVintageLampPost,
    createKinnareeStatue,
    createThaiTree
  } = window.WPKBuilders;

  function buildUpperTerrace(templeModelGroup) {
    const terraceGroup = new THREE.Group();
    terraceGroup.name = 'Upper_Terrace_Phai_Thi';
    terraceGroup.position.set(0, 1.2, -12);

    // 1. Elevated Platform with Blue Glazed Ceramic Openwork Walls & Grand Marble Staircases
    const terraceBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(64, 4.4, 25.5), MAT.blueCeramicWall));
    terraceBase.position.y = 2.2;
    terraceGroup.add(terraceBase);

    const terraceFloorTop = addShadow(new THREE.Mesh(new THREE.BoxGeometry(64.2, 0.35, 25.7), MAT.marbleFloor));
    terraceFloorTop.position.y = 4.4;
    terraceGroup.add(terraceFloorTop);

    [
      [0, -12.6, 64.0, 0.45],
      [0, 12.6, 64.0, 0.45],
      [-31.8, 0, 0.45, 25.4],
      [31.8, 0, 0.45, 25.4]
    ].forEach(([bx, bz, bw, bl]) => {
      const rail = addShadow(new THREE.Mesh(new THREE.BoxGeometry(bw, 1.15, bl), MAT.blueCeramicWall));
      rail.position.set(bx, 5.0, bz);
      terraceGroup.add(rail);
    });

    // North & South Marble Staircases with Chinese Stone Guardians & Cycad Gardens
    [-9.5, 9.5].forEach(sx => {
      [-1, 1].forEach(zSide => {
        const stairGroup = new THREE.Group();
        for (let step = 0; step < 8; step++) {
          const st = addShadow(new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.55, 4.4 - step * 0.48), MAT.whiteStucco));
          st.position.set(0, step * 0.55 + 0.28, zSide * (2.2 - step * 0.24));
          stairGroup.add(st);
        }
        [-2.5, 2.5].forEach(rx => {
          const sRail = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.35, 4.8), MAT.blueCeramicWall));
          sRail.position.set(rx, 2.6, zSide * 2.1);
          sRail.rotation.x = zSide * 0.62;
          stairGroup.add(sRail);

          const guardian = new THREE.Group();
          const gPed = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.75), MAT.whiteStucco);
          gPed.position.y = 0.42;
          guardian.add(gPed);
          const gBody = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.45, 8), MAT.chineseStone));
          gBody.position.y = 1.55;
          guardian.add(gBody);
          const gHead = new THREE.Mesh(new THREE.SphereGeometry(0.20, 8, 8), MAT.chineseStone);
          gHead.position.y = 2.42;
          guardian.add(gHead);
          guardian.position.set(rx * 1.35, 0, zSide * 4.5);
          stairGroup.add(guardian);
        });
        stairGroup.position.set(sx, 0, zSide * 12.8);
        terraceGroup.add(stairGroup);
      });
    });

    // Red Carpet Runner & Stanchion Posts along the Terrace Pathway
    [-18.2, 18.2].forEach(cz => {
      const carpet = new THREE.Mesh(new THREE.BoxGeometry(58, 0.08, 1.85), MAT.redCarpet);
      carpet.position.set(0, 0.05, cz);
      terraceGroup.add(carpet);

      for (let x = -26; x <= 26; x += 6.5) {
        const stanchion = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.85, 6), MAT.bronzeDark);
        stanchion.position.set(x, 0.42, cz + (cz > 0 ? 1.05 : -1.05));
        terraceGroup.add(stanchion);
      }
    });

    // Row of Lotus Pinnacles, Flower Beds & Vintage Lamp Posts along the Terrace Front
    [-26, -21, -16, -4, 4, 15, 22].forEach((px, idx) => {
      [-14.6, 14.6].forEach(pz => {
        const phum = createPhumKhaoBinPinnacle(0.92);
        phum.position.set(px, 0, pz);
        terraceGroup.add(phum);

        const flowerBed = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.45, 0.28, 10), MAT.pinkElephant);
        flowerBed.position.set(px, 0.14, pz + (pz > 0 ? 1.2 : -1.2));
        terraceGroup.add(flowerBed);

        if (idx % 2 === 0) {
          const lamp = createVintageLampPost(0.9);
          lamp.position.set(px + 2.1, 0, pz + (pz > 0 ? 0.6 : -0.6));
          terraceGroup.add(lamp);
        }
      });
    });

    // Foreground Open-Sided Sala Pavilion & Golden Mondop Niche
    const frontSala = new THREE.Group();
    frontSala.position.set(2.5, 0, 18.8);
    const fsPlatform = addShadow(new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.8, 9.2), MAT.whiteStucco));
    fsPlatform.position.y = 0.4;
    frontSala.add(fsPlatform);
    [-2.8, 2.8].forEach(cx => {
      [-3.8, 0, 3.8].forEach(cz => {
        const col = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.55, 5.2, 0.55), MAT.whiteStucco));
        col.position.set(cx, 3.0, cz);
        frontSala.add(col);
      });
    });
    const fsRoof = createThaiRoof(8.2, 10.8, 4.8, 2, true, false);
    fsRoof.position.y = 5.6;
    frontSala.add(fsRoof);

    const goldNiche = new THREE.Group();
    goldNiche.position.set(4.6, 0, 2.2);
    const gnBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 2.6), MAT.brightGold));
    gnBase.position.y = 0.8;
    goldNiche.add(gnBase);
    const gnBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.2, 2.1), MAT.redDoor));
    gnBody.position.y = 3.2;
    goldNiche.add(gnBody);
    const gnArch = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.4, 2.3), MAT.emeraldMosaic));
    gnArch.position.y = 5.2;
    goldNiche.add(gnArch);
    const gnSpire = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.4, 4.2, 4), MAT.brightGold));
    gnSpire.position.y = 7.8;
    gnSpire.rotation.y = Math.PI / 4;
    goldNiche.add(gnSpire);
    frontSala.add(goldNiche);

    terraceGroup.add(frontSala);

    // 2. PHRA SI RATTANA CHEDI (พระศรีรัตนเจดีย์)
    const mainChedi = createChedi(8.8, 30.5, MAT.brightGold, 18.2);
    mainChedi.position.set(-20.5, 4.4, 0);
    terraceGroup.add(mainChedi);

    // 3. PHRA MONDOP (พระมณฑป)
    const mondopGroup = new THREE.Group();
    mondopGroup.position.set(0, 4.4, 0);

    const mBase1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(14.6, 1.8, 14.6), MAT.whiteStucco));
    mBase1.position.y = 0.9;
    mondopGroup.add(mBase1);
    const mBase2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(13.2, 1.6, 13.2), MAT.brightGold));
    mBase2.position.y = 2.6;
    mondopGroup.add(mBase2);

    const mBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(10.2, 8.8, 10.2), MAT.emeraldMosaic));
    mBody.position.y = 7.8;
    mondopGroup.add(mBody);

    for (let d = 0; d < 4; d++) {
      const ang = (d * Math.PI) / 2;
      const porch = new THREE.Group();
      const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.8, 0.5), MAT.pearlDoor);
      door.position.set(0, 6.0, 5.2);
      porch.add(door);
      const arch = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.5, 3.2, 4), MAT.brightGold));
      arch.position.set(0, 9.8, 5.3);
      arch.rotation.y = Math.PI / 4;
      porch.add(arch);
      porch.rotation.y = ang;
      mondopGroup.add(porch);
    }

    for (let i = -5.6; i <= 5.6; i += 2.24) {
      [-5.8, 5.8].forEach(k => {
        const c1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.46, 9.2, 0.46), MAT.brightGold));
        c1.position.set(i, 8.0, k);
        mondopGroup.add(c1);
        const c2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.46, 9.2, 0.46), MAT.brightGold));
        c2.position.set(k, 8.0, i);
        mondopGroup.add(c2);
      });
    }

    for (let t = 0; t < 7; t++) {
      const s = 12.4 * Math.pow(0.77, t);
      const h = 1.95;
      const tierY = 12.6 + t * 1.62;
      const tier = addShadow(new THREE.Mesh(new THREE.ConeGeometry(s * 0.72, h, 4), MAT.brightGold));
      tier.position.y = tierY;
      tier.rotation.y = Math.PI / 4;
      mondopGroup.add(tier);

      for (let c = 0; c < 8; c++) {
        const cAng = (c * Math.PI) / 4;
        const hh = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.95, 5), MAT.brightGold);
        hh.position.set(Math.sin(cAng) * (s * 0.64), tierY - 0.25, Math.cos(cAng) * (s * 0.64));
        hh.rotation.z = 0.35;
        mondopGroup.add(hh);
      }
    }
    const mSpireTip = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.85, 10.2, 12), MAT.brightGold));
    mSpireTip.position.y = 28.0;
    mondopGroup.add(mSpireTip);

    [[-6.8, -6.8], [6.8, -6.8], [-6.8, 6.8], [6.8, 6.8]].forEach(([mx, mz]) => {
      const mon = createPrang(2.2, 6.8, MAT.whiteStucco, MAT.brightGold);
      mon.position.set(mx, 0, mz);
      mondopGroup.add(mon);
    });
    [[-4.2, 7.6], [4.2, 7.6], [-4.2, -7.6], [4.2, -7.6]].forEach(([ex, ez]) => {
      const elGroup = new THREE.Group();
      const ped = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 1.8), MAT.whiteStucco);
      ped.position.y = 0.45;
      elGroup.add(ped);
      const body = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.95, 1.3), MAT.bronzeDark));
      body.position.y = 1.35;
      elGroup.add(body);
      elGroup.position.set(ex, 0, ez);
      mondopGroup.add(elGroup);
    });

    terraceGroup.add(mondopGroup);

    // 4. DETAILED ANGKOR WAT SCALE MODEL (ปราสาทนครวัดจำลองรายละเอียดสูงบนฐานไพที)
    const angkorGroup = new THREE.Group();
    angkorGroup.position.set(0, 4.4, -9.6);
    const akPed = addShadow(new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.8, 6.2), MAT.whiteStucco));
    akPed.position.y = 0.4;
    angkorGroup.add(akPed);

    // Outer gallery enclosure & cruciform inner terrace
    const akOuterWall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.9, 5.4), MAT.chineseStone));
    akOuterWall.position.y = 1.25;
    angkorGroup.add(akOuterWall);
    const akInner = addShadow(new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.1, 3.8), MAT.chineseStone));
    akInner.position.y = 2.15;
    angkorGroup.add(akInner);

    // 5 Ringed Khmer Lotus-Bud Towers
    [[-1.8, -1.2, 2.4], [1.8, -1.2, 2.4], [-1.8, 1.2, 2.4], [1.8, 1.2, 2.4], [0, 0, 3.8]].forEach(([ax, az, ah]) => {
      for (let ring = 0; ring < 5; ring++) {
        const r = (0.58 - ring * 0.09) * (ah / 3.0);
        const disk = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.8, r, (ah / 5) * 0.95, 10), MAT.chineseStone));
        disk.position.set(ax, 2.4 + ring * (ah / 5), az);
        angkorGroup.add(disk);
      }
    });
    terraceGroup.add(angkorGroup);

    // 5. PRASAT PHRA THEP BIDON WITH EAST ROYAL PORTICO, TRIPLE ARCH VALENCE & DRAGON PORCELAIN JARS
    const pantheonGroup = new THREE.Group();
    pantheonGroup.position.set(20.0, 4.4, 0);

    const pBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(17.5, 2.8, 17.5), MAT.whiteStucco));
    pBase.position.y = 1.4;
    pantheonGroup.add(pBase);

    const wingNS = addShadow(new THREE.Mesh(new THREE.BoxGeometry(8.4, 8.2, 18.2), MAT.pantheonWall));
    wingNS.position.y = 6.9;
    pantheonGroup.add(wingNS);

    const wingEW = addShadow(new THREE.Mesh(new THREE.BoxGeometry(18.2, 8.2, 8.4), MAT.pantheonWall));
    wingEW.position.y = 6.9;
    pantheonGroup.add(wingEW);

    [-7.2, -5.2, 5.2, 7.2].forEach(nz => {
      const nicheBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.65, 3.4, 1.25), MAT.brightGold));
      nicheBody.position.set(4.4, 4.5, nz);
      pantheonGroup.add(nicheBody);
      const nicheSpire = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.2, 6), MAT.brightGold));
      nicheSpire.position.set(4.4, 7.3, nz);
      pantheonGroup.add(nicheSpire);
    });

    [-2.4, -0.85, 0.85, 2.4].forEach(pz => {
      const pCol = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.58, 8.8, 0.58), MAT.brightGold));
      pCol.position.set(9.4, 7.0, pz);
      pantheonGroup.add(pCol);
    });
    const porticoValence = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.45, 5.2), MAT.brightGold));
    porticoValence.position.set(9.4, 10.6, 0);
    pantheonGroup.add(porticoValence);

    const throneDoor = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 5.8, 2.2), MAT.brightGold));
    throneDoor.position.set(9.1, 5.7, 0);
    pantheonGroup.add(throneDoor);

    for (let p = -8.8; p <= 8.8; p += 2.2) {
      [-4.6, 4.6].forEach(side => {
        const colNS = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.48, 8.4, 0.48), MAT.brightGold));
        colNS.position.set(side, 6.9, p);
        pantheonGroup.add(colNS);

        const colEW = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.48, 8.4, 0.48), MAT.brightGold));
        colEW.position.set(p, 6.9, side);
        pantheonGroup.add(colEW);
      });
    }

    const pRoofNS = createThaiRoof(11.2, 20.2, 8.2, 3, true, true);
    pRoofNS.position.y = 11.0;
    pantheonGroup.add(pRoofNS);

    const pRoofEW = createThaiRoof(11.2, 20.2, 8.2, 3, true, true);
    pRoofEW.position.y = 11.0;
    pRoofEW.rotation.y = Math.PI / 2;
    pantheonGroup.add(pRoofEW);

    const centerPrang = createPrang(6.8, 24.5, MAT.whitePorcelain, MAT.brightGold);
    centerPrang.position.y = 13.5;
    pantheonGroup.add(centerPrang);

    terraceGroup.add(pantheonGroup);

    // Broad East Marble Staircase, Blue-and-White Porcelain Dragon Jars & Bonsai Trees
    const eastStairGroup = new THREE.Group();
    eastStairGroup.position.set(32.0, 0, 0);
    for (let step = 0; step < 8; step++) {
      const st = addShadow(new THREE.Mesh(new THREE.BoxGeometry(4.6 - step * 0.48, 0.55, 8.4), MAT.whiteStucco));
      st.position.set(2.3 - step * 0.24, step * 0.55 + 0.28, 0);
      eastStairGroup.add(st);
    }
    [-4.4, 4.4].forEach(rz => {
      const sRail = addShadow(new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.35, 0.38), MAT.blueCeramicWall));
      sRail.position.set(2.1, 2.6, rz);
      sRail.rotation.z = 0.62;
      eastStairGroup.add(sRail);

      const jarStand = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.62, 0.65, 10), MAT.bronzeDark);
      jarStand.position.set(4.5, 0.32, rz);
      eastStairGroup.add(jarStand);

      const dragonJar = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.46, 0.92, 12), MAT.blueCeramicWall));
      dragonJar.position.set(4.5, 1.10, rz);
      eastStairGroup.add(dragonJar);

      const bonsai = createThaiTree(4.5, 1.45, rz, 0.52);
      eastStairGroup.add(bonsai);

      const lamp = createVintageLampPost(0.95);
      lamp.position.set(1.2, 2.2, rz);
      eastStairGroup.add(lamp);
    });
    terraceGroup.add(eastStairGroup);

    // 6. TWIN GOLDEN REDENTED CHEDIS WITH DEMON & MONKEY CARYATIDS
    [-8.2, 8.2].forEach(zPos => {
      const twinChedi = createRedentedGoldenChedi(5.8, 19.5);
      twinChedi.position.set(29.2, 4.4, zPos);
      terraceGroup.add(twinChedi);
    });

    // 7. GIANT YAKSHA GUARDIANS & GOLDEN KINNAREE STATUES around Upper Terrace
    const terraceLeftGreenYaksha = createYakshaGuardian(1.15, 0x0f766e, '#b45309', true);
    terraceLeftGreenYaksha.position.set(-29.5, 0, -17.5);
    terraceLeftGreenYaksha.rotation.y = Math.PI / 2;
    terraceGroup.add(terraceLeftGreenYaksha);

    const terraceRightRedYaksha = createYakshaGuardian(1.15, 0xdc2626, '#b45309', true);
    terraceRightRedYaksha.position.set(-29.5, 0, 17.5);
    terraceRightRedYaksha.rotation.y = Math.PI / 2;
    terraceGroup.add(terraceRightRedYaksha);

    const yakColors = [0x0f766e, 0xf8fafc, 0xdc2626, 0x1e3a8a, 0xd97706, 0x6d28d9];
    [-11.5, -5.8, 5.8, 11.5].forEach((zPos, idx) => {
      const yakEast = createYakshaGuardian(1.0, yakColors[idx % yakColors.length], '#b45309', true);
      yakEast.position.set(34.8, 0, zPos);
      yakEast.rotation.y = Math.PI / 2;
      terraceGroup.add(yakEast);
    });

    [-16, -6, 6, 16, 26].forEach(kx => {
      [-11.8, 11.8].forEach(kz => {
        const kin = createKinnareeStatue(0.85);
        kin.position.set(kx, 4.4, kz);
        kin.rotation.y = kz > 0 ? 0 : Math.PI;
        terraceGroup.add(kin);
      });
    });

    templeModelGroup.add(terraceGroup);
    return terraceGroup;
  }

  return { buildUpperTerrace };
})();
