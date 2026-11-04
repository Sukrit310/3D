// ============================================================================
// MODULE 3: PHRA UBOSOT, 12 SALA RAI, COFFERED STAR CEILING, 3D GARUDA-NAGA FRIEZE &
//           SMOOTH-CHESTED EMERALD BUDDHA WITH HYPER-DETAILED 3-SEASON ROYAL ATTIRE
// ============================================================================

window.WPKMainUbosot = (function () {
  const { MAT } = window.WPKTextures;
  const { addShadow, createThaiRoof, createTravelersPalm, createLotusBasin } = window.WPKBuilders;

  function buildPhraUbosot(templeModelGroup) {
    const ubosotGroup = new THREE.Group();
    ubosotGroup.name = 'Phra_Ubosot_Complex';
    ubosotGroup.position.set(0, 1.2, 18);

    // 1. Multi-stepped Marble Terrace & 3D Golden Garuda-Clutching-Naga Base Frieze (ฐานสิงห์ประดับครุฑยุดนาค 112 ตน)
    const ubBase1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(28.5, 1.6, 44.5), MAT.blueCeramicWall));
    ubBase1.position.y = 0.8;
    ubosotGroup.add(ubBase1);

    const ubBase2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(26.2, 1.6, 41.8), MAT.brightGold));
    ubBase2.position.y = 2.4;
    ubosotGroup.add(ubBase2);

    for (let z = -19.5; z <= 19.5; z += 2.6) {
      [-13.25, 13.25].forEach(x => {
        const gBody = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.05, 0.44), MAT.brightGold);
        gBody.position.set(x, 2.45, z);
        ubosotGroup.add(gBody);
        const gWings = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.42, 0.96), MAT.brightGold);
        gWings.position.set(x, 2.65, z);
        ubosotGroup.add(gWings);
      });
    }
    for (let x = -11.5; x <= 11.5; x += 2.6) {
      [-21.0, 21.0].forEach(z => {
        const gBody = new THREE.Mesh(new THREE.BoxGeometry(0.44, 1.05, 0.38), MAT.brightGold);
        gBody.position.set(x, 2.45, z);
        ubosotGroup.add(gBody);
        const gWings = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.42, 0.44), MAT.brightGold);
        gWings.position.set(x, 2.65, z);
        ubosotGroup.add(gWings);
      });
    }

    [
      [0, -21.8, 28.0, 0.52],
      [0, 21.8, 28.0, 0.52],
      [-13.8, 0, 0.52, 44.0],
      [13.8, 0, 0.52, 44.0]
    ].forEach(([bx, bz, bw, bl]) => {
      const rail = addShadow(new THREE.Mesh(new THREE.BoxGeometry(bw, 1.25, bl), MAT.blueCeramicWall));
      rail.position.set(bx, 2.15, bz);
      ubosotGroup.add(rail);
    });

    ubosotGroup.add(createTravelersPalm(-14.6, 0.2, -16.5, 1.35, 0.4));
    ubosotGroup.add(createTravelersPalm(-14.6, 0.2, 16.5, 1.35, -0.4));
    ubosotGroup.add(createTravelersPalm(14.6, 0.2, -16.5, 1.35, -0.4));
    ubosotGroup.add(createTravelersPalm(14.6, 0.2, 16.5, 1.35, 0.4));

    // Blooming Porcelain Lotus Basins around Phra Ubosot Terrace (อ่างบัวลายครามปลูกบัวหลวงบานสะพรั่งรอบพระอุโบสถ)
    [
      [-14.8, -8.5], [-14.8, 8.5], [14.8, -8.5], [14.8, 8.5],
      [-7.5, 22.8], [7.5, 22.8], [-7.5, -22.8], [7.5, -22.8]
    ].forEach(([lx, lz]) => {
      ubosotGroup.add(createLotusBasin(lx, 0.1, lz, 1.05));
    });

    // 2. Cutaway-capable Exterior Sanctuary Walls
    const cutawayWallsGroup = new THREE.Group();
    cutawayWallsGroup.name = 'Ubosot_Cutaway_Walls';

    const ubHall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(16.2, 10.2, 29.8), MAT.emeraldMosaic));
    ubHall.position.y = 8.3;
    cutawayWallsGroup.add(ubHall);

    for (let z = -11.5; z <= 11.5; z += 4.6) {
      [-8.2, 8.2].forEach(x => {
        const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.38, 3.8, 1.65), MAT.brightGold);
        winFrame.position.set(x, 7.8, z);
        cutawayWallsGroup.add(winFrame);
        const winShutters = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.4, 1.35), MAT.gableGold);
        winShutters.position.set(x, 7.8, z);
        cutawayWallsGroup.add(winShutters);
        const winCrown = new THREE.Mesh(new THREE.ConeGeometry(0.98, 2.3, 4), MAT.brightGold);
        winCrown.position.set(x, 10.6, z);
        winCrown.rotation.y = Math.PI / 4;
        cutawayWallsGroup.add(winCrown);
      });
    }

    [-4.2, 0, 4.2].forEach(xDoor => {
      [-15.0, 15.0].forEach(zDoor => {
        const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 5.4, 0.38), MAT.pearlDoor);
        doorPanel.position.set(xDoor, 6.2, zDoor);
        cutawayWallsGroup.add(doorPanel);

        const doorArch = new THREE.Mesh(new THREE.ConeGeometry(1.45, 2.9, 4), MAT.brightGold);
        doorArch.position.set(xDoor, 10.2, zDoor);
        doorArch.rotation.y = Math.PI / 4;
        cutawayWallsGroup.add(doorArch);
      });
    });

    ubosotGroup.add(cutawayWallsGroup);

    // =========================================================================
    // 3. MASTERPIECE EMERALD BUDDHA & GOLDEN BUSABOK THRONE
    // =========================================================================
    const shrineGroup = new THREE.Group();
    shrineGroup.name = 'Emerald_Buddha_Interior_Hall';
    shrineGroup.position.set(0, 3.2, 0);

    [-7.6, 7.6].forEach(wx => {
      const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.28, 7.4, 26.5), MAT.interiorEmeraldWall);
      sideWall.position.set(wx, 3.7, 0);
      shrineGroup.add(sideWall);
    });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(15.2, 7.4, 0.28), MAT.interiorEmeraldWall);
    backWall.position.set(0, 3.7, -13.2);
    shrineGroup.add(backWall);

    const cofferedCeiling = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.24, 26.5), MAT.cofferedCeiling);
    cofferedCeiling.position.set(0, 9.75, 0);
    shrineGroup.add(cofferedCeiling);

    [-4.6, 4.6].forEach(cx => {
      [-6.5, 0, 6.5].forEach(cz => {
        const teakCol = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.66, 9.8, 18), MAT.redGoldColumn));
        teakCol.position.set(cx, 4.9, cz);
        shrineGroup.add(teakCol);

        const lotusFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.78, 1.15, 16), MAT.brightGold);
        lotusFoot.position.set(cx, 0.58, cz);
        shrineGroup.add(lotusFoot);
      });
    });
    [-6.5, 0, 6.5].forEach(bz => {
      const tieBeam = new THREE.Mesh(new THREE.BoxGeometry(15.0, 0.48, 0.52), MAT.teakWoodColumn);
      tieBeam.position.set(0, 9.4, bz);
      shrineGroup.add(tieBeam);
    });

    [
      [-5.6, 7.8, 3.2],
      [5.6, 7.8, 3.2],
      [-3.4, 7.5, -2.5],
      [3.4, 7.5, -2.5]
    ].forEach(([chX, chY, chZ]) => {
      const chandelier = new THREE.Group();
      const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6), MAT.brightGold);
      chain.position.y = 1.1;
      chandelier.add(chain);

      for (let tier = 0; tier < 3; tier++) {
        const r = 0.85 - tier * 0.22;
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.82, 0.35, 12), MAT.crystalGlow);
        ring.position.y = -tier * 0.38;
        chandelier.add(ring);
      }
      const cLight = new THREE.PointLight(0xffd27d, 0.9, 16);
      cLight.position.y = -0.2;
      chandelier.add(cLight);

      chandelier.position.set(chX, chY, chZ);
      shrineGroup.add(chandelier);
    });

    const busabokCenterZ = -3.8;

    const baseDark = addShadow(new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.6, 4.6), MAT.bronzeDark));
    baseDark.position.set(0, 0.8, busabokCenterZ);
    shrineGroup.add(baseDark);

    for (let c = 0; c < 4; c++) {
      const w = 5.4 - c * 0.42;
      const d = 4.2 - c * 0.32;
      const tier = addShadow(new THREE.Mesh(new THREE.BoxGeometry(w, 0.48, d), MAT.brightGold));
      tier.position.set(0, 1.8 + c * 0.46, busabokCenterZ);
      shrineGroup.add(tier);
    }

    for (let kx = -2.4; kx <= 2.4; kx += 0.6) {
      const kanokPanel = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.95, 4), MAT.brightGold));
      kanokPanel.position.set(kx, 2.15, busabokCenterZ + 2.15);
      kanokPanel.rotation.y = Math.PI / 4;
      shrineGroup.add(kanokPanel);
    }

    [-3.15, 3.15].forEach(cx => {
      const chatraPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 6.8, 8), MAT.brightGold);
      chatraPole.position.set(cx, 3.4, busabokCenterZ);
      shrineGroup.add(chatraPole);
      for (let ct = 0; ct < 9; ct++) {
        const cr = 0.58 - ct * 0.048;
        const cRing = new THREE.Mesh(new THREE.CylinderGeometry(cr * 0.78, cr, 0.16, 12), MAT.brightGold);
        cRing.position.set(cx, 3.8 + ct * 0.34, busabokCenterZ);
        shrineGroup.add(cRing);
      }

      const standB = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.95, 10), MAT.brightGold);
      standB.position.set(cx * 0.82, 2.4, busabokCenterZ + 1.2);
      shrineGroup.add(standB);
      const standHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), MAT.brightGold);
      standHead.position.set(cx * 0.82, 3.55, busabokCenterZ + 1.2);
      shrineGroup.add(standHead);
      const standCrown = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.52, 8), MAT.brightGold);
      standCrown.position.set(cx * 0.82, 3.92, busabokCenterZ + 1.2);
      shrineGroup.add(standCrown);

      const treeMat = cx < 0 ? MAT.brightGold : MAT.whiteStucco;
      for (let tt = 0; tt < 5; tt++) {
        const tr = 0.32 - tt * 0.045;
        const foliageTier = new THREE.Mesh(new THREE.ConeGeometry(tr, 0.28, 8), treeMat);
        foliageTier.position.set(cx * 0.62, 3.65 + tt * 0.24, busabokCenterZ + 1.65);
        shrineGroup.add(foliageTier);
      }
    });

    [-1.18, 1.18].forEach(gx => {
      const garland = new THREE.Group();
      for (let gt = 0; gt < 6; gt++) {
        const r = 0.08 + gt * 0.032;
        const cone = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.7, r, 0.14, 10), MAT.pearlCanopy);
        cone.position.y = -gt * 0.16;
        garland.add(cone);
      }
      garland.position.set(gx, 3.65, busabokCenterZ + 1.45);
      shrineGroup.add(garland);
    });

    [-1.68, -1.32, 1.32, 1.68].forEach(px => {
      [-1.3, 1.3].forEach(pz => {
        const bCol = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 4.9, 12), MAT.teakWoodColumn));
        bCol.position.set(px, 5.9, busabokCenterZ + pz);
        shrineGroup.add(bCol);
        const bCap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.15, 0.28, 10), MAT.brightGold);
        bCap.position.set(px, 8.2, busabokCenterZ + pz);
        shrineGroup.add(bCap);
      });
    });

    for (let t = 0; t < 5; t++) {
      const w = 4.4 * Math.pow(0.82, t);
      const roofTier = addShadow(new THREE.Mesh(new THREE.BoxGeometry(w, 0.42, w * 0.85), MAT.brightGold));
      roofTier.position.set(0, 8.35 + t * 0.46, busabokCenterZ);
      shrineGroup.add(roofTier);
    }

    const canopyGroup = new THREE.Group();
    canopyGroup.position.set(0, 7.35, busabokCenterZ + 0.15);

    const pearlDome = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.95, 20), MAT.pearlCanopy);
    pearlDome.position.y = 0.25;
    canopyGroup.add(pearlDome);

    const goldInnerCeiling = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.08, 20), MAT.brightGold);
    goldInnerCeiling.position.y = -0.20;
    canopyGroup.add(goldInnerCeiling);

    for (let b = 0; b < 12; b++) {
      const bAng = (b * Math.PI * 2) / 12;
      const drop = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 4), MAT.brightGold);
      drop.position.set(Math.sin(bAng) * 0.76, -0.32, Math.cos(bAng) * 0.76);
      drop.rotation.x = Math.PI;
      canopyGroup.add(drop);
    }
    shrineGroup.add(canopyGroup);

    // =========================================================================
    // 3.5 MUSEUM-GRADE EMERALD BUDDHA SCULPTURE (SMOOTH FLAT-CHESTED ROYAL JADE TORSO)
    // =========================================================================
    const emeraldBuddha = new THREE.Group();
    emeraldBuddha.name = 'Sacred_Emerald_Buddha_Statue';
    emeraldBuddha.position.set(0, 3.45, busabokCenterZ);

    const prabhavaliGroup = new THREE.Group();
    prabhavaliGroup.position.set(0, 2.15, -0.58);
    const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.08, 12, 32), MAT.brightGold);
    prabhavaliGroup.add(haloRing);
    for (let fa = 0; fa < 18; fa++) {
      const fAng = (fa * Math.PI) / 17 - Math.PI * 0.03;
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.34, 5), MAT.brightGold);
      flame.position.set(Math.cos(fAng) * 1.28, Math.sin(fAng) * 1.28, 0);
      flame.rotation.z = fAng - Math.PI / 2;
      prabhavaliGroup.add(flame);
    }
    emeraldBuddha.add(prabhavaliGroup);

    // A) Double-Tiered Golden Lotus Petal Throne
    const lotusCore = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.15, 0.45, 24), MAT.brightGold));
    lotusCore.position.y = 0.22;
    emeraldBuddha.add(lotusCore);
    for (let lp = 0; lp < 18; lp++) {
      const lAng = (lp * Math.PI * 2) / 18;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), MAT.brightGold);
      petal.scale.set(0.85, 1.18, 0.55);
      petal.position.set(Math.sin(lAng) * 1.18, 0.26, Math.cos(lAng) * 1.18);
      petal.rotation.y = lAng;
      emeraldBuddha.add(petal);

      const lowerPetal = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), MAT.brightGold);
      lowerPetal.scale.set(0.85, 0.9, 0.55);
      lowerPetal.position.set(Math.sin(lAng + 0.17) * 1.22, 0.08, Math.cos(lAng + 0.17) * 1.22);
      lowerPetal.rotation.y = lAng + 0.17;
      emeraldBuddha.add(lowerPetal);
    }

    // B) Sculpted Dark-Emerald Green Rock/Lotus Tier
    const darkRockTier = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.22, 0.52, 20), MAT.darkJadeRock));
    darkRockTier.position.y = 0.70;
    emeraldBuddha.add(darkRockTier);
    for (let rk = 0; rk < 14; rk++) {
      const rAng = (rk * Math.PI * 2) / 14;
      const nodule = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), MAT.emeraldJade);
      nodule.scale.set(1.1, 0.85, 0.75);
      nodule.position.set(Math.sin(rAng) * 1.04, 0.70, Math.cos(rAng) * 1.04);
      emeraldBuddha.add(nodule);
    }

    // C) Upper Golden Cushion & Sculpted Meditating Emerald Jade Legs
    const upperGoldSeat = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.96, 1.04, 0.28, 20), MAT.brightGold));
    upperGoldSeat.position.y = 1.08;
    emeraldBuddha.add(upperGoldSeat);

    const jadeLegs = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.94, 0.32, 24), MAT.emeraldJade));
    jadeLegs.scale.set(1.15, 1.0, 0.85);
    jadeLegs.position.y = 1.36;
    emeraldBuddha.add(jadeLegs);

    [-0.78, 0.78].forEach(kx => {
      const kneeCap = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), MAT.emeraldJade));
      kneeCap.scale.set(1.2, 0.75, 1.0);
      kneeCap.position.set(kx, 1.36, 0.16);
      emeraldBuddha.add(kneeCap);
    });

    // D) Smooth, Dignified Flat-Chested Emerald Jade Torso (พระอุระหยกมรกตเรียบสง่างาม ไม่มีก้อนหน้าอกนูน!)
    const torsoPoints = [
      new THREE.Vector2(0.01, 1.48),
      new THREE.Vector2(0.55, 1.48),
      new THREE.Vector2(0.42, 1.78),
      new THREE.Vector2(0.50, 2.12),
      new THREE.Vector2(0.56, 2.38),
      new THREE.Vector2(0.24, 2.48),
      new THREE.Vector2(0.01, 2.48)
    ];
    const jadeTorsoGeom = new THREE.LatheGeometry(torsoPoints, 32);
    const jadeTorso = addShadow(new THREE.Mesh(jadeTorsoGeom, MAT.emeraldJade));
    jadeTorso.scale.set(1.06, 1.0, 0.72);
    emeraldBuddha.add(jadeTorso);

    [-1, 1].forEach(side => {
      const shoulder = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), MAT.emeraldJade));
      shoulder.position.set(side * 0.56, 2.34, 0.04);
      emeraldBuddha.add(shoulder);

      const upperArm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.115, 0.68, 14), MAT.emeraldJade));
      upperArm.position.set(side * 0.58, 2.02, 0.06);
      upperArm.rotation.z = -side * 0.16;
      emeraldBuddha.add(upperArm);

      const forearm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.095, 0.58, 14), MAT.emeraldJade));
      forearm.position.set(side * 0.34, 1.60, 0.34);
      forearm.rotation.z = side * 1.15;
      forearm.rotation.x = 0.45;
      emeraldBuddha.add(forearm);
    });

    const rightPalm = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.16), MAT.emeraldJade);
    rightPalm.position.set(0, 1.52, 0.54);
    emeraldBuddha.add(rightPalm);
    const leftPalm = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.16), MAT.emeraldJade);
    leftPalm.position.set(0, 1.46, 0.54);
    emeraldBuddha.add(leftPalm);
    for (let f = -3; f <= 3; f++) {
      const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.014, 0.18, 6), MAT.emeraldJade);
      finger.rotation.z = Math.PI / 2;
      finger.position.set(f * 0.025, 1.53, 0.60);
      emeraldBuddha.add(finger);
    }
    [-0.06, 0.06].forEach(rx => {
      const diamondRing = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), MAT.diamondSparkle);
      diamondRing.position.set(rx, 1.55, 0.61);
      emeraldBuddha.add(diamondRing);
    });

    // E) Three Auspicious Neck Folds & High-Detail Sculpted Emerald Jade Face
    for (let nf = 0; nf < 3; nf++) {
      const neckFold = new THREE.Mesh(new THREE.CylinderGeometry(0.21 - nf * 0.008, 0.22 - nf * 0.008, 0.08, 18), MAT.emeraldJade);
      neckFold.position.set(0, 2.50 + nf * 0.075, 0.04);
      emeraldBuddha.add(neckFold);
    }

    const headY = 2.88;
    const jadeHead = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 32), MAT.emeraldJade));
    jadeHead.scale.set(0.93, 1.08, 0.96);
    jadeHead.position.set(0, headY, 0.06);
    emeraldBuddha.add(jadeHead);

    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), MAT.emeraldJade);
    chin.scale.set(1.15, 0.85, 0.9);
    chin.position.set(0, headY - 0.24, 0.30);
    emeraldBuddha.add(chin);

    [-0.115, 0.115].forEach((bx, idx) => {
      const side = idx === 0 ? -1 : 1;
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.024, 0.045), MAT.brightGold);
      brow.position.set(bx, headY + 0.085, 0.365);
      brow.rotation.z = -side * 0.14;
      emeraldBuddha.add(brow);

      const upperEyelid = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 12), MAT.emeraldJade);
      upperEyelid.scale.set(1.32, 0.68, 0.65);
      upperEyelid.position.set(bx, headY + 0.024, 0.362);
      emeraldBuddha.add(upperEyelid);

      const eyeSlit = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.016, 0.022), MAT.whiteStucco);
      eyeSlit.position.set(bx, headY + 0.010, 0.382);
      emeraldBuddha.add(eyeSlit);

      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.019, 8, 8), MAT.bronzeDark);
      iris.position.set(bx, headY + 0.010, 0.394);
      emeraldBuddha.add(iris);
    });

    const noseBridge = new THREE.Mesh(new THREE.ConeGeometry(0.048, 0.17, 10), MAT.emeraldJade);
    noseBridge.position.set(0, headY - 0.015, 0.388);
    noseBridge.rotation.x = 0.26;
    emeraldBuddha.add(noseBridge);
    [-0.036, 0.036].forEach(nx => {
      const nostrilWing = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), MAT.emeraldJade);
      nostrilWing.position.set(nx, headY - 0.075, 0.395);
      emeraldBuddha.add(nostrilWing);
    });

    const upperLip = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.022, 0.045), MAT.emeraldJade);
    upperLip.position.set(0, headY - 0.125, 0.368);
    emeraldBuddha.add(upperLip);
    const lowerLip = new THREE.Mesh(new THREE.BoxGeometry(0.122, 0.024, 0.044), MAT.emeraldJade);
    lowerLip.position.set(0, headY - 0.152, 0.364);
    emeraldBuddha.add(lowerLip);
    const smileLine = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.012, 0.048), MAT.brightGold);
    smileLine.position.set(0, headY - 0.138, 0.372);
    emeraldBuddha.add(smileLine);

    [-0.335, 0.335].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.024, 0.38, 10), MAT.emeraldJade);
      ear.position.set(ex, headY - 0.04, 0.05);
      emeraldBuddha.add(ear);

      for (let et = 0; et < 3; et++) {
        const drop = new THREE.Mesh(new THREE.ConeGeometry(0.048 - et * 0.01, 0.09, 8), MAT.brightGold);
        drop.position.set(ex, headY - 0.20 - et * 0.065, 0.05);
        drop.rotation.x = Math.PI;
        emeraldBuddha.add(drop);
      }
      const earRuby = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), MAT.rubyGem);
      earRuby.position.set(ex, headY - 0.19, 0.08);
      emeraldBuddha.add(earRuby);
    });

    // =========================================================================
    // F.1) SUMMER SEASON ROYAL ATTIRE (เครื่องทรงฤดูร้อน)
    // =========================================================================
    const summerAttire = new THREE.Group();
    summerAttire.name = 'Attire_Summer';

    const headband = new THREE.Mesh(new THREE.CylinderGeometry(0.358, 0.348, 0.18, 24), MAT.brightGold);
    headband.position.set(0, headY + 0.18, 0.06);
    summerAttire.add(headband);
    const foreheadRuby = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), MAT.rubyGem);
    foreheadRuby.position.set(0, headY + 0.18, 0.42);
    summerAttire.add(foreheadRuby);

    for (let da = -5; da <= 5; da++) {
      if (da === 0) continue;
      const dAng = da * 0.20;
      const dia = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), MAT.diamondSparkle);
      dia.position.set(Math.sin(dAng) * 0.365, headY + 0.18, 0.06 + Math.cos(dAng) * 0.365);
      summerAttire.add(dia);
    }

    [-0.34, 0.34].forEach((ex, idx) => {
      const side = idx === 0 ? -1 : 1;
      [0, 0.08].forEach((yOff, lIdx) => {
        const crownWing = new THREE.Mesh(new THREE.ConeGeometry(0.095 - lIdx * 0.02, 0.48, 5), MAT.brightGold);
        crownWing.position.set(ex + side * (0.04 + lIdx * 0.03), headY + 0.19 + yOff, 0.04);
        crownWing.rotation.z = -side * (0.36 + lIdx * 0.12);
        summerAttire.add(crownWing);
      });
    });

    for (let ct = 0; ct < 6; ct++) {
      const r = 0.28 - ct * 0.040;
      const cy = headY + 0.30 + ct * 0.125;
      const tier = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.84, r, 0.13, 18), MAT.brightGold);
      tier.position.set(0, cy, 0.06);
      summerAttire.add(tier);

      for (let g = 0; g < 8; g++) {
        const gAng = (g * Math.PI) / 4;
        const gMat = g % 2 === 0 ? MAT.diamondSparkle : MAT.rubyGem;
        const gem = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), gMat);
        gem.position.set(Math.sin(gAng) * r, cy, 0.06 + Math.cos(gAng) * r);
        summerAttire.add(gem);
      }
    }
    const crownSpire = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.072, 0.76, 14), MAT.brightGold));
    crownSpire.position.set(0, headY + 1.32, 0.06);
    summerAttire.add(crownSpire);
    const crownTopDiamond = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), MAT.diamondSparkle);
    crownTopDiamond.position.set(0, headY + 1.72, 0.06);
    summerAttire.add(crownTopDiamond);

    for (let kl = 0; kl < 3; kl++) {
      const rTop = 0.44 + kl * 0.04;
      const rBot = 0.52 + kl * 0.05;
      const cY = 2.46 - kl * 0.055;
      const goldCollar = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, 0.07, 20), MAT.brightGold);
      goldCollar.position.y = cY;
      summerAttire.add(goldCollar);
    }
    for (let cg = -4; cg <= 4; cg++) {
      const cAng = cg * 0.24;
      const cGem = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), cg % 2 === 0 ? MAT.rubyGem : MAT.diamondSparkle);
      cGem.position.set(Math.sin(cAng) * 0.52, 2.40, 0.04 + Math.cos(cAng) * 0.42);
      summerAttire.add(cGem);
    }

    [-1, 1].forEach(side => {
      const shoulderBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.20, 0.40), MAT.brightGold));
      shoulderBase.position.set(side * 0.56, 2.44, 0.05);
      summerAttire.add(shoulderBase);

      [0, 0.12, 0.24].forEach((sOff, sIdx) => {
        const shoulderTip = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.15 - sIdx * 0.025, 0.58 - sIdx * 0.08, 6), MAT.brightGold));
        shoulderTip.position.set(side * (0.66 + sIdx * 0.06), 2.72 + sOff * 0.5, 0.08);
        shoulderTip.rotation.z = -side * (0.34 + sIdx * 0.08);
        summerAttire.add(shoulderTip);
      });

      const epRuby = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), MAT.rubyGem);
      epRuby.position.set(side * 0.56, 2.48, 0.26);
      summerAttire.add(epRuby);

      const chain = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.96, 0.06), MAT.brightGold);
      chain.position.set(0, 2.02, 0.40);
      chain.rotation.z = side * 0.52;
      summerAttire.add(chain);
      for (let step = -3; step <= 3; step++) {
        const dLink = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), MAT.diamondSparkle);
        dLink.position.set(side * step * 0.065, 2.02 - step * 0.11, 0.43);
        summerAttire.add(dLink);
      }

      const armlet = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.17, 14), MAT.brightGold);
      armlet.position.set(side * 0.58, 2.12, 0.06);
      armlet.rotation.z = -side * 0.16;
      summerAttire.add(armlet);
      const armCrest = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.24, 5), MAT.brightGold);
      armCrest.position.set(side * 0.72, 2.24, 0.06);
      armCrest.rotation.z = -side * 0.25;
      summerAttire.add(armCrest);

      const bracelet = new THREE.Mesh(new THREE.CylinderGeometry(0.128, 0.128, 0.14, 14), MAT.brightGold);
      bracelet.position.set(side * 0.22, 1.54, 0.46);
      bracelet.rotation.z = side * 1.15;
      summerAttire.add(bracelet);

      [0, 0.14].forEach((kOff, kIdx) => {
        const kneeWing = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.24 - kIdx * 0.04, 0.84 - kIdx * 0.12, 5), MAT.brightGold));
        kneeWing.position.set(side * (1.04 + kIdx * 0.06), 1.50 + kOff, 0.22);
        kneeWing.rotation.z = -side * 0.90;
        kneeWing.rotation.y = side * 0.25;
        summerAttire.add(kneeWing);
      });
    });

    const waistBand = new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.57, 0.26, 20), MAT.brightGold);
    waistBand.position.y = 1.62;
    summerAttire.add(waistBand);
    const frontChaiWai = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.46, 0.08), MAT.brightGold);
    frontChaiWai.position.set(0, 1.32, 0.72);
    frontChaiWai.rotation.x = -0.35;
    summerAttire.add(frontChaiWai);

    [2.05, 1.70].forEach(my => {
      const goldDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16), MAT.brightGold);
      goldDisc.rotation.x = Math.PI / 2;
      goldDisc.position.set(0, my, 0.41);
      summerAttire.add(goldDisc);
      const ruby = new THREE.Mesh(new THREE.SphereGeometry(0.058, 10, 10), MAT.rubyGem);
      ruby.scale.set(1.0, 1.0, 0.45);
      ruby.position.set(0, my, 0.435);
      summerAttire.add(ruby);

      for (let d = 0; d < 8; d++) {
        const dAng = (d * Math.PI) / 4;
        const dGem = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), MAT.diamondSparkle);
        dGem.position.set(Math.cos(dAng) * 0.115, my + Math.sin(dAng) * 0.115, 0.435);
        summerAttire.add(dGem);
      }
    });
    emeraldBuddha.add(summerAttire);

    // =========================================================================
    // F.2) RAINY SEASON ROYAL ATTIRE (เครื่องทรงฤดูฝน)
    // =========================================================================
    const rainyAttire = new THREE.Group();
    rainyAttire.name = 'Attire_Rainy';
    rainyAttire.visible = false;

    const blueHeadCap = new THREE.Mesh(new THREE.SphereGeometry(0.356, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.55), MAT.sapphireEnamel);
    blueHeadCap.position.set(0, headY + 0.04, 0.06);
    rainyAttire.add(blueHeadCap);

    for (let ring = 0; ring < 4; ring++) {
      const rRad = 0.34 - ring * 0.065;
      const rY = headY + 0.18 + ring * 0.075;
      const cCount = 16 - ring * 3;
      for (let c = 0; c < cCount; c++) {
        const cAng = (c * Math.PI * 2) / cCount;
        const curl = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 6), c % 2 === 0 ? MAT.brightGold : MAT.sapphireEnamel);
        curl.position.set(Math.sin(cAng) * rRad, rY, 0.06 + Math.cos(cAng) * rRad);
        rainyAttire.add(curl);
      }
    }

    const rainyHeadband = new THREE.Mesh(new THREE.CylinderGeometry(0.358, 0.348, 0.11, 22), MAT.brightGold);
    rainyHeadband.position.set(0, headY + 0.13, 0.06);
    rainyAttire.add(rainyHeadband);
    for (let da = -4; da <= 4; da++) {
      const dAng = da * 0.22;
      const dia = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), da === 0 ? MAT.rubyGem : MAT.diamondSparkle);
      dia.position.set(Math.sin(dAng) * 0.362, headY + 0.13, 0.06 + Math.cos(dAng) * 0.362);
      rainyAttire.add(dia);
    }

    const rainyUshnisha = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 0.18, 16), MAT.brightGold);
    rainyUshnisha.position.set(0, headY + 0.46, 0.06);
    rainyAttire.add(rainyUshnisha);
    const rainyRasmi = new THREE.Mesh(new THREE.ConeGeometry(0.088, 0.64, 14), MAT.diamondSparkle);
    rainyRasmi.position.set(0, headY + 0.84, 0.06);
    rainyAttire.add(rainyRasmi);

    const rainyRobeTorso = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.60, 0.92, 24), MAT.rainyMonasticGoldRobe));
    rainyRobeTorso.scale.set(1.06, 1.0, 0.76);
    rainyRobeTorso.position.set(0.10, 1.90, 0.04);
    rainyRobeTorso.rotation.z = -0.14;
    rainyAttire.add(rainyRobeTorso);

    const leftShoulderRobe = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.21, 14, 14), MAT.rainyMonasticGoldRobe));
    leftShoulderRobe.position.set(0.56, 2.35, 0.05);
    rainyAttire.add(leftShoulderRobe);
    const leftArmRobe = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.135, 0.68, 14), MAT.rainyMonasticGoldRobe));
    leftArmRobe.position.set(0.58, 2.02, 0.06);
    leftArmRobe.rotation.z = -0.16;
    rainyAttire.add(leftArmRobe);

    const rainySash = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.14, 0.12), MAT.brightGold));
    rainySash.position.set(0.25, 1.98, 0.36);
    rainySash.rotation.z = -0.18;
    rainyAttire.add(rainySash);
    for (let sg = -4; sg <= 4; sg++) {
      const sGem = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), sg % 2 === 0 ? MAT.rubyGem : MAT.diamondSparkle);
      sGem.position.set(0.25 + sg * 0.02, 1.98 - sg * 0.11, 0.43);
      rainyAttire.add(sGem);
    }

    const rainyLapWrap = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.80, 0.96, 0.34, 24), MAT.rainyMonasticGoldRobe));
    rainyLapWrap.scale.set(1.14, 1.0, 0.86);
    rainyLapWrap.position.y = 1.37;
    rainyAttire.add(rainyLapWrap);
    emeraldBuddha.add(rainyAttire);

    // =========================================================================
    // F.3) WINTER SEASON ROYAL ATTIRE (เครื่องทรงฤดูหนาว)
    // =========================================================================
    const winterAttire = new THREE.Group();
    winterAttire.name = 'Attire_Winter';
    winterAttire.visible = false;

    const winterHeadCap = new THREE.Mesh(new THREE.SphereGeometry(0.358, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.58), MAT.sapphireEnamel);
    winterHeadCap.position.set(0, headY + 0.04, 0.06);
    winterAttire.add(winterHeadCap);

    for (let ring = 0; ring < 4; ring++) {
      const rRad = 0.34 - ring * 0.065;
      const rY = headY + 0.18 + ring * 0.075;
      const cCount = 16 - ring * 3;
      for (let c = 0; c < cCount; c++) {
        const cAng = (c * Math.PI * 2) / cCount;
        const curl = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 6), c % 2 === 0 ? MAT.brightGold : MAT.sapphireEnamel);
        curl.position.set(Math.sin(cAng) * rRad, rY, 0.06 + Math.cos(cAng) * rRad);
        winterAttire.add(curl);
      }
    }

    const winterCrownBand = new THREE.Mesh(new THREE.CylinderGeometry(0.362, 0.352, 0.15, 22), MAT.brightGold);
    winterCrownBand.position.set(0, headY + 0.15, 0.06);
    winterAttire.add(winterCrownBand);
    for (let da = -4; da <= 4; da++) {
      const dAng = da * 0.22;
      const dia = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), da === 0 ? MAT.rubyGem : MAT.diamondSparkle);
      dia.position.set(Math.sin(dAng) * 0.366, headY + 0.15, 0.06 + Math.cos(dAng) * 0.366);
      winterAttire.add(dia);
    }

    const winterUshnisha = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.20, 0.20, 16), MAT.brightGold);
    winterUshnisha.position.set(0, headY + 0.48, 0.06);
    winterAttire.add(winterUshnisha);
    const winterRasmi = new THREE.Mesh(new THREE.ConeGeometry(0.092, 0.68, 14), MAT.diamondSparkle);
    winterRasmi.position.set(0, headY + 0.88, 0.06);
    winterAttire.add(winterRasmi);

    const winterShawl = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.90, 1.14, 28), MAT.goldMeshShawl));
    winterShawl.scale.set(1.12, 1.0, 0.80);
    winterShawl.position.set(0, 1.94, 0.05);
    winterAttire.add(winterShawl);

    [-0.58, 0.58].forEach(sx => {
      const sCap = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.23, 14, 14), MAT.goldMeshShawl));
      sCap.position.set(sx, 2.35, 0.05);
      winterAttire.add(sCap);
    });

    const winterCollarBand = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.56, 0.14, 22), MAT.brightGold);
    winterCollarBand.position.set(0, 2.44, 0.05);
    winterAttire.add(winterCollarBand);

    for (let b = 0; b < 4; b++) {
      const bY = 2.34 - b * 0.22;
      const bZ = 0.40 + b * 0.045;
      const broochDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.04, 12), MAT.brightGold);
      broochDisc.rotation.x = Math.PI / 2;
      broochDisc.position.set(0, bY, bZ);
      winterAttire.add(broochDisc);

      const broochRuby = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), MAT.rubyGem);
      broochRuby.scale.set(1.0, 1.0, 0.45);
      broochRuby.position.set(0, bY, bZ + 0.022);
      winterAttire.add(broochRuby);

      for (let d = 0; d < 6; d++) {
        const dAng = (d * Math.PI) / 3;
        const dStud = new THREE.Mesh(new THREE.SphereGeometry(0.017, 6, 6), MAT.diamondSparkle);
        dStud.position.set(Math.cos(dAng) * 0.08, bY + Math.sin(dAng) * 0.08, bZ + 0.02);
        winterAttire.add(dStud);
      }
    }

    for (let t = 0; t < 24; t++) {
      const tAng = (t * Math.PI * 2) / 24;
      const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.18, 6), MAT.brightGold);
      tassel.position.set(Math.sin(tAng) * 0.96, 1.34, 0.05 + Math.cos(tAng) * 0.72);
      tassel.rotation.x = Math.PI;
      winterAttire.add(tassel);
    }

    emeraldBuddha.add(winterAttire);

    const buddhaLight = new THREE.PointLight(0xffe066, 2.3, 18);
    buddhaLight.position.set(0, 2.8, 2.4);
    emeraldBuddha.add(buddhaLight);

    shrineGroup.add(emeraldBuddha);

    // 3.6 Foreground Altar Offerings, Pink Floral Cones, Mantra Plaque & Blue Donation Boxes
    const altarZ = -1.2;

    const lowerGoldBuddha = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 1.05, 10), MAT.brightGold);
    lowerGoldBuddha.position.set(0, 1.35, altarZ - 0.2);
    shrineGroup.add(lowerGoldBuddha);

    [-2.35, 2.35].forEach(px => {
      const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.25, 0.75, 10), MAT.redDoor);
      tray.position.set(px, 1.15, altarZ - 0.3);
      shrineGroup.add(tray);
      const pinkCone = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.15, 10), MAT.pinkElephant);
      pinkCone.position.set(px, 2.05, altarZ - 0.3);
      shrineGroup.add(pinkCone);
    });

    [-3.45, 3.45].forEach(ux => {
      const urn = new THREE.Mesh(new THREE.SphereGeometry(0.68, 12, 12), MAT.brightGold);
      urn.position.set(ux, 1.85, altarZ - 0.2);
      shrineGroup.add(urn);
      const urnSpire = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.65, 10), MAT.brightGold);
      urnSpire.position.set(ux, 2.95, altarZ - 0.2);
      shrineGroup.add(urnSpire);
    });

    [-1.15, 1.15].forEach(vx => {
      const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.65, 8), MAT.whiteStucco);
      vase.position.set(vx, 0.75, altarZ + 0.55);
      shrineGroup.add(vase);
      const bouquet = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 10), MAT.blueCeramicWall);
      bouquet.position.set(vx, 1.25, altarZ + 0.55);
      shrineGroup.add(bouquet);
    });

    [-3.8, 3.8].forEach(sx => {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.45, 8), MAT.whitePorcelain);
      leaf.position.set(sx, 1.65, altarZ + 1.85);
      leaf.scale.z = 0.25;
      shrineGroup.add(leaf);
    });

    const mantraBox = addShadow(new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.25, 0.45), MAT.mantraPlaque));
    mantraBox.position.set(0, 0.65, altarZ + 1.95);
    mantraBox.rotation.x = -0.18;
    shrineGroup.add(mantraBox);

    [-4.35, 4.35].forEach(dx => {
      const dBox = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.45, 1.2), MAT.donationBox));
      dBox.position.set(dx, 0.72, altarZ + 2.55);
      shrineGroup.add(dBox);
    });

    ubosotGroup.add(shrineGroup);

    // 4. Exterior Colonnade of Ornate Octagonal Gold-and-Blue Floral Mosaic Pillars
    for (let z = -18.0; z <= 18.0; z += 3.6) {
      [-10.8, 10.8].forEach(x => {
        const col = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.54, 10.4, 8), MAT.emeraldMosaic));
        col.position.set(x, 8.4, z);
        ubosotGroup.add(col);

        const baseBand = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.64, 1.2, 8), MAT.brightGold);
        baseBand.position.set(x, 3.8, z);
        ubosotGroup.add(baseBand);

        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.46, 1.35, 8), MAT.brightGold);
        cap.position.set(x, 13.1, z);
        ubosotGroup.add(cap);

        const bracket = new THREE.Mesh(new THREE.ConeGeometry(0.30, 1.9, 4), MAT.brightGold);
        bracket.position.set(x + (x > 0 ? 0.68 : -0.68), 12.2, z);
        bracket.rotation.z = x > 0 ? -0.45 : 0.45;
        ubosotGroup.add(bracket);
      });
    }
    for (let x = -7.2; x <= 7.2; x += 3.6) {
      [-18.0, 18.0].forEach(z => {
        const col = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.54, 10.4, 8), MAT.emeraldMosaic));
        col.position.set(x, 8.4, z);
        ubosotGroup.add(col);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.46, 1.35, 8), MAT.brightGold);
        cap.position.set(x, 13.1, z);
        ubosotGroup.add(cap);
      });
    }

    [-19.5, 19.5].forEach(sz => {
      [-5.2, -1.8, 1.8, 5.2].forEach(sx => {
        const singha = new THREE.Group();
        const ped = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 1.2), MAT.whiteStucco);
        ped.position.y = 2.6;
        singha.add(ped);
        const lion = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.15, 0.95), MAT.bronzeDark));
        lion.position.y = 3.6;
        singha.add(lion);
        singha.position.set(sx, 0, sz);
        ubosotGroup.add(singha);
      });
    });

    // 5. Grand 3-Tiered Curved Thai Roof with Telescopic Porches
    const ubRoof = createThaiRoof(26.5, 42.0, 14.5, 3, true, true);
    ubRoof.position.y = 13.5;
    ubosotGroup.add(ubRoof);

    // 6. Eight Gold, Royal-Blue & Crimson Sema Boundary Pavilions
    const semaOffsets = [
      [-15.6, -23.2], [0, -24.5], [15.6, -23.2],
      [-15.6, 0],                 [15.6, 0],
      [-15.6, 23.2],  [0, 24.5],  [15.6, 23.2]
    ];
    semaOffsets.forEach(([sx, sz]) => {
      const sema = new THREE.Group();
      const sBase1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 3.2), MAT.blueCeramicWall));
      sBase1.position.y = 0.45;
      sema.add(sBase1);
      const sBase2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.1, 2.6), MAT.brightGold));
      sBase2.position.y = 1.45;
      sema.add(sBase2);

      const redCore = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.85, 2.5, 1.85), MAT.redDoor));
      redCore.position.y = 3.2;
      sema.add(redCore);

      [-1.0, 1.0].forEach(px => {
        [-1.0, 1.0].forEach(pz => {
          const p = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.6, 0.32), MAT.brightGold);
          p.position.set(px, 3.2, pz);
          sema.add(p);
        });
      });

      const blueVault = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.65, 1.4, 4), MAT.royalBlueGlass));
      blueVault.position.y = 4.95;
      blueVault.rotation.y = Math.PI / 4;
      sema.add(blueVault);

      for (let t = 0; t < 4; t++) {
        const s = 1.65 * Math.pow(0.70, t);
        const cone = addShadow(new THREE.Mesh(new THREE.ConeGeometry(s, 1.05, 4), MAT.brightGold));
        cone.position.y = 5.75 + t * 0.72;
        cone.rotation.y = Math.PI / 4;
        sema.add(cone);
      }

      const fW = 1.85;
      [[-fW, -fW], [fW, -fW], [-fW, fW], [fW, fW]].forEach(([fx, fz]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6), MAT.brassRailing);
        post.position.set(fx, 0.7, fz);
        sema.add(post);
      });

      sema.position.set(sx, 0, sz);
      ubosotGroup.add(sema);
    });

    // 7. Twelve Sala Rai Pavilions Surrounding Phra Ubosot
    function createSalaRaiPavilion(x, z, rotY) {
      const sala = new THREE.Group();
      const base = addShadow(new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.75, 7.8), MAT.whiteStucco));
      base.position.y = 0.38;
      sala.add(base);

      [-2.2, 2.2].forEach(cx => {
        [-3.1, 0, 3.1].forEach(cz => {
          const col = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.52, 4.4, 0.52), MAT.whiteStucco));
          col.position.set(cx, 2.55, cz);
          sala.add(col);

          const bracket = new THREE.Mesh(new THREE.ConeGeometry(0.20, 1.15, 4), MAT.brightGold);
          bracket.position.set(cx + (cx > 0 ? 0.38 : -0.38), 4.1, cz);
          bracket.rotation.z = cx > 0 ? -0.45 : 0.45;
          sala.add(bracket);
        });
      });

      const sRoof = createThaiRoof(6.8, 9.2, 4.2, 2, true, false);
      sRoof.position.y = 4.75;
      sala.add(sRoof);

      [-2.6, 2.6].forEach(jx => {
        const jar = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.28, 0.68, 10), MAT.blueCeramicWall));
        jar.position.set(jx, 0.34, 4.35);
        sala.add(jar);
      });

      sala.position.set(x, 0, z);
      sala.rotation.y = rotY || 0;
      return sala;
    }

    const salaCoords = [
      [-22.5, -16.5, 0], [-22.5, 0, 0], [-22.5, 16.5, 0],
      [22.5, -16.5, 0],  [22.5, 0, 0],  [22.5, 16.5, 0],
      [-9.5, 24.8, Math.PI / 2], [9.5, 24.8, Math.PI / 2],
      [-9.5, -24.8, Math.PI / 2], [9.5, -24.8, Math.PI / 2]
    ];
    salaCoords.forEach(([sx, sz, sRot]) => {
      ubosotGroup.add(createSalaRaiPavilion(sx, sz, sRot));
    });

    templeModelGroup.add(ubosotGroup);
    return {
      ubosotGroup,
      cutawayWallsGroup,
      attireGroups: {
        summer: summerAttire,
        rainy: rainyAttire,
        winter: winterAttire
      }
    };
  }

  return { buildPhraUbosot };
})();
