// ============================================================================
// MODULE 2: MASTERPIECE THAI ROOF ORNAMENTS, CHEDIS, FLAT-CHESTED YAKSHAS & BUDDHAS,
//           BUSES, TUK-TUKS, TAXIS, CHAO PHRAYA BOATS, BRONZE CENSERS & TOURISTS
// ============================================================================

window.WPKBuilders = (function () {
  const { MAT, allMaterials, createYakshaBrocadeTexture } = window.WPKTextures;

  function addShadow(mesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // 1. Curved Catenary Thai Roof with Stepped Bai Raka Finials, Wind Bells, Chofa, Hang Hong, Eave Brackets & 3D Gable Relief
  function createThaiRoof(width, length, height, tiers, useBlueCore, addTelescopicPorch) {
    const roofGroup = new THREE.Group();
    const roofMat = useBlueCore ? MAT.roofBlueOrange : MAT.roofOrangeGreen;

    const totalTiers = tiers || 3;
    for (let t = 0; t < totalTiers; t++) {
      const scaleW = 1 - t * 0.19;
      const scaleL = 1 - t * 0.12;
      const w = width * scaleW;
      const l = length * scaleL;
      const h = height * (0.48 - t * 0.04);
      const yOffset = t * (height * 0.31);

      const shape = new THREE.Shape();
      shape.moveTo(-w / 2, 0);
      shape.quadraticCurveTo(-w * 0.22, h * 0.28, 0, h);
      shape.quadraticCurveTo(w * 0.22, h * 0.28, w / 2, 0);
      shape.lineTo(w / 2 - 0.35, -0.22);
      shape.quadraticCurveTo(0, h * 0.72, -w / 2 + 0.35, -0.22);
      shape.closePath();

      const extrudeGeom = new THREE.ExtrudeGeometry(shape, {
        depth: l,
        bevelEnabled: false,
        curveSegments: 14
      });
      extrudeGeom.translate(0, 0, -l / 2);

      const roofMesh = addShadow(new THREE.Mesh(extrudeGeom, roofMat));
      roofMesh.position.y = yOffset;
      roofGroup.add(roofMesh);

      const ridge = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.46, l + 0.68), MAT.brightGold));
      ridge.position.set(0, yOffset + h, 0);
      roofGroup.add(ridge);

      [-w / 2, w / 2].forEach(xEdge => {
        const eaveTrim = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, l + 0.2), MAT.redDoor);
        eaveTrim.position.set(xEdge, yOffset - 0.08, 0);
        roofGroup.add(eaveTrim);
        const goldStrip = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.15, l + 0.25), MAT.brightGold);
        goldStrip.position.set(xEdge, yOffset + 0.08, 0);
        roofGroup.add(goldStrip);

        if (t === 0 && width >= 10) {
          const bellStep = Math.max(2.2, l / 14);
          for (let bz = -l / 2 + 1.0; bz <= l / 2 - 1.0; bz += bellStep) {
            const bellCone = new THREE.Mesh(new THREE.ConeGeometry(0.095, 0.26, 5), MAT.brightGold);
            bellCone.position.set(xEdge, yOffset - 0.35, bz);
            roofGroup.add(bellCone);
          }
        }
      });

      [-l / 2, l / 2].forEach((zPos, idx) => {
        const dir = idx === 0 ? -1 : 1;

        const gableShape = new THREE.Shape();
        gableShape.moveTo(-w * 0.44, 0.05);
        gableShape.quadraticCurveTo(-w * 0.18, h * 0.28, 0, h * 0.9);
        gableShape.quadraticCurveTo(w * 0.18, h * 0.28, w * 0.44, 0.05);
        gableShape.closePath();

        const gableGeom = new THREE.ExtrudeGeometry(gableShape, { depth: 0.36, bevelEnabled: false, curveSegments: 10 });
        gableGeom.translate(0, 0, idx === 0 ? -0.22 : -0.14);
        const gableMesh = addShadow(new THREE.Mesh(gableGeom, MAT.gableGold));
        gableMesh.position.set(0, yOffset, zPos);
        roofGroup.add(gableMesh);

        if (t === 0 && width >= 8) {
          const reliefEmblem = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.085, w * 0.055, 0.26, 8), MAT.brightGold);
          reliefEmblem.rotation.x = Math.PI / 2;
          reliefEmblem.position.set(0, yOffset + h * 0.36, zPos + dir * 0.22);
          roofGroup.add(reliefEmblem);
        }

        [-1, 1].forEach(side => {
          const bargeLen = Math.hypot(w * 0.5, h);
          const bargeAngle = Math.atan2(w * 0.5, h) * side;
          const barge = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.38, bargeLen + 0.4, 0.48), MAT.brightGold));
          barge.position.set(side * (w * 0.24), yOffset + h * 0.48, zPos + dir * 0.12);
          barge.rotation.z = bargeAngle;
          roofGroup.add(barge);

          const toothCount = Math.min(8, Math.max(4, Math.floor(bargeLen / 1.25)));
          for (let bt = 1; bt < toothCount; bt++) {
            const frac = bt / toothCount;
            const tx = side * (w * 0.48 * frac);
            const ty = yOffset + h * (1 - frac * 0.88) + 0.20;
            const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.58, 4), MAT.brightGold);
            tooth.position.set(tx, ty, zPos + dir * 0.18);
            tooth.rotation.z = -side * 0.25;
            roofGroup.add(tooth);
          }

          const hangHong = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.26, 1.48, 6), MAT.brightGold));
          hangHong.position.set(side * (w * 0.51), yOffset + 0.42, zPos + dir * 0.16);
          hangHong.rotation.z = -side * 0.38;
          hangHong.rotation.x = dir * 0.22;
          roofGroup.add(hangHong);
        });

        const chofaGroup = new THREE.Group();
        const chofaBase = new THREE.Mesh(new THREE.SphereGeometry(0.34, 8, 8), MAT.brightGold);
        chofaGroup.add(chofaBase);
        const chofaHorn = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.22, 2.18, 8), MAT.brightGold));
        chofaHorn.position.set(0, 1.05, dir * 0.22);
        chofaHorn.rotation.x = dir * 0.32;
        chofaGroup.add(chofaHorn);
        chofaGroup.position.set(0, yOffset + h + 0.15, zPos + dir * 0.15);
        roofGroup.add(chofaGroup);
      });
    }

    if (addTelescopicPorch) {
      [-1, 1].forEach(dir => {
        const porchW = width * 0.64;
        const porchL = length * 0.18;
        const porchH = height * 0.36;
        const porchShape = new THREE.Shape();
        porchShape.moveTo(-porchW / 2, 0);
        porchShape.quadraticCurveTo(-porchW * 0.2, porchH * 0.3, 0, porchH);
        porchShape.quadraticCurveTo(porchW * 0.2, porchH * 0.3, porchW / 2, 0);
        porchShape.closePath();

        const pGeom = new THREE.ExtrudeGeometry(porchShape, { depth: porchL, bevelEnabled: false, curveSegments: 8 });
        pGeom.translate(0, 0, -porchL / 2);
        const pMesh = addShadow(new THREE.Mesh(pGeom, roofMat));
        pMesh.position.set(0, -height * 0.12, dir * (length * 0.52));
        roofGroup.add(pMesh);

        const pgShape = new THREE.Shape();
        pgShape.moveTo(-porchW * 0.44, 0.05);
        pgShape.lineTo(0, porchH * 0.88);
        pgShape.lineTo(porchW * 0.44, 0.05);
        pgShape.closePath();
        const pgGeom = new THREE.ExtrudeGeometry(pgShape, { depth: 0.25, bevelEnabled: false });
        const pgMesh = new THREE.Mesh(pgGeom, MAT.gableGold);
        pgMesh.position.set(0, -height * 0.12, dir * (length * 0.52 + porchL * 0.46));
        roofGroup.add(pgMesh);

        const pRidge = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, porchL + 0.3), MAT.brightGold);
        pRidge.position.set(0, -height * 0.12 + porchH, dir * (length * 0.52));
        roofGroup.add(pRidge);

        const pChofa = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.45, 6), MAT.brightGold);
        pChofa.position.set(0, -height * 0.12 + porchH + 0.6, dir * (length * 0.52 + porchL * 0.48));
        pChofa.rotation.x = dir * 0.3;
        roofGroup.add(pChofa);
      });
    }

    return roofGroup;
  }

  // 2. High-Detail Lankan-Style Bell Stupa (พระศรีรัตนเจดีย์)
  function createChedi(radius, height, mat, baseWidth) {
    const group = new THREE.Group();
    const bW = baseWidth || radius * 2.25;

    for (let i = 0; i < 4; i++) {
      const s = bW * (1 - i * 0.11);
      const h = 1.05;
      const baseMesh = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s, h, s), mat));
      baseMesh.position.y = i * h + h / 2;
      group.add(baseMesh);

      const cross1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s * 1.06, h * 0.85, s * 0.72), mat));
      cross1.position.y = i * h + h / 2;
      group.add(cross1);
      const cross2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s * 0.72, h * 0.85, s * 1.06), mat));
      cross2.position.y = i * h + h / 2;
      group.add(cross2);
    }

    if (radius >= 5) {
      for (let d = 0; d < 4; d++) {
        const angle = (d * Math.PI) / 2;
        const niche = new THREE.Group();
        const nBody = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.8, 4.6, 1.8), mat));
        nBody.position.y = 4.8;
        niche.add(nBody);
        const nDoor = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.2, 1.9), MAT.bronzeDark);
        nDoor.position.y = 4.2;
        niche.add(nDoor);
        const nSpire = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.65, 4.4, 8), MAT.brightGold));
        nSpire.position.y = 9.2;
        niche.add(nSpire);
        niche.position.set(Math.sin(angle) * (radius * 0.94), 0, Math.cos(angle) * (radius * 0.94));
        niche.rotation.y = angle;
        group.add(niche);

        const cAngle = angle + Math.PI / 4;
        const cornerTurret = new THREE.Group();
        const ctBase = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.6, 2.2), mat));
        ctBase.position.y = 3.8;
        cornerTurret.add(ctBase);
        const ctCone = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.2, 4.8, 10), MAT.brightGold));
        ctCone.position.y = 8.0;
        cornerTurret.add(ctCone);
        cornerTurret.position.set(Math.sin(cAngle) * (bW * 0.44), 0, Math.cos(cAngle) * (bW * 0.44));
        group.add(cornerTurret);
      }
    }

    const harmikaBaseY = 7.4 + height * 0.42;
    const bellPoints = [
      new THREE.Vector2(0.01, 4.0),
      new THREE.Vector2(radius * 0.98, 4.0),
      new THREE.Vector2(radius * 0.84, 4.6),
      new THREE.Vector2(radius * 0.93, 5.2),
      new THREE.Vector2(radius * 0.80, 5.7),
      new THREE.Vector2(radius * 0.88, 6.2),
      new THREE.Vector2(radius * 0.76, 6.7),
      new THREE.Vector2(radius * 0.83, 7.2),
      new THREE.Vector2(radius * 0.75, 7.6),
      new THREE.Vector2(radius * 0.86, 7.6 + height * 0.10),
      new THREE.Vector2(radius * 0.82, 7.6 + height * 0.22),
      new THREE.Vector2(radius * 0.68, 7.6 + height * 0.34),
      new THREE.Vector2(radius * 0.42, harmikaBaseY),
      new THREE.Vector2(0.01, harmikaBaseY)
    ];
    const bellGeom = new THREE.LatheGeometry(bellPoints, 48);
    group.add(addShadow(new THREE.Mesh(bellGeom, mat)));

    const harmikaW = radius * 0.76;
    const harmikaH = height * 0.065;
    const harmikaBox = addShadow(new THREE.Mesh(new THREE.BoxGeometry(harmikaW, harmikaH, harmikaW), mat));
    harmikaBox.position.y = harmikaBaseY + harmikaH / 2;
    group.add(harmikaBox);

    const saoHanY = harmikaBaseY + harmikaH + height * 0.025;
    const saoHanCore = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.30, radius * 0.34, height * 0.05, 16), MAT.bronzeDark);
    saoHanCore.position.y = saoHanY;
    group.add(saoHanCore);
    for (let s = 0; s < 16; s++) {
      const sAng = (s * Math.PI * 2) / 16;
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, height * 0.055, 6), mat);
      strut.position.set(Math.sin(sAng) * (radius * 0.35), saoHanY, Math.cos(sAng) * (radius * 0.35));
      group.add(strut);
    }

    const spirePoints = [new THREE.Vector2(0.01, saoHanY + height * 0.025)];
    const rings = 22;
    const spireStart = saoHanY + height * 0.025;
    const spireEnd = 7.6 + height * 0.90;
    for (let r = 0; r < rings; r++) {
      const t = r / rings;
      const y = spireStart + t * (spireEnd - spireStart);
      const rad = radius * (0.36 * (1 - t * 0.78));
      spirePoints.push(new THREE.Vector2(rad * 1.06, y));
      spirePoints.push(new THREE.Vector2(rad * 0.88, y + (spireEnd - spireStart) / (rings * 2)));
    }
    spirePoints.push(new THREE.Vector2(radius * 0.045, 7.6 + height * 0.98));
    spirePoints.push(new THREE.Vector2(0.01, 7.6 + height * 1.03));

    const spireGeom = new THREE.LatheGeometry(spirePoints, 40);
    group.add(addShadow(new THREE.Mesh(spireGeom, mat)));

    const orb = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.055, 12, 12), MAT.brightGold);
    orb.position.y = 7.6 + height * 1.03 + 0.25;
    group.add(orb);

    return group;
  }

  // 3. Twin Golden Redented Stupas WITH Demon & Monkey Caryatids
  function createRedentedGoldenChedi(width, height) {
    const group = new THREE.Group();
    const baseTiers = 7;
    const tierH = (height * 0.44) / baseTiers;
    for (let i = 0; i < baseTiers; i++) {
      const s = width * (1 - i * 0.085);
      const y = i * tierH + tierH / 2;

      const core = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s, tierH * 0.92, s), MAT.brightGold));
      core.position.y = y;
      group.add(core);

      const wing1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s * 1.15, tierH * 0.82, s * 0.65), MAT.brightGold));
      wing1.position.y = y;
      group.add(wing1);

      const wing2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s * 0.65, tierH * 0.82, s * 1.15), MAT.brightGold));
      wing2.position.y = y;
      group.add(wing2);
    }

    const caryatidColors = [0xdc2626, 0x0f766e, 0x1d4ed8, 0xf8fafc, 0xd97706];
    for (let c = 0; c < 16; c++) {
      const ang = (c * Math.PI * 2) / 16;
      const dist = width * 0.50;
      const fig = new THREE.Group();
      const cMat = new THREE.MeshStandardMaterial({ color: caryatidColors[c % caryatidColors.length], roughness: 0.35 });

      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.72, 6), MAT.brightGold);
      body.position.y = 1.65;
      fig.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), cMat);
      head.position.y = 2.12;
      fig.add(head);
      const crown = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.32, 6), MAT.brightGold);
      crown.position.y = 2.38;
      fig.add(crown);

      [-0.16, 0.16].forEach(ax => {
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 6), cMat);
        arm.position.set(ax, 2.15, 0.08);
        arm.rotation.z = ax > 0 ? -0.35 : 0.35;
        fig.add(arm);
      });

      fig.position.set(Math.sin(ang) * dist, 0, Math.cos(ang) * dist);
      fig.rotation.y = ang;
      group.add(fig);
    }

    const upperStart = height * 0.44;
    const upperTiers = 10;
    const uH = (height * 0.42) / upperTiers;
    for (let t = 0; t < upperTiers; t++) {
      const p = t / upperTiers;
      const r = (width * 0.34) * Math.pow(1 - p * 0.82, 0.9);
      const oct = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.85, r, uH * 0.95, 12), MAT.brightGold));
      oct.position.y = upperStart + t * uH + uH / 2;
      group.add(oct);
    }

    const needle = addShadow(new THREE.Mesh(new THREE.ConeGeometry(width * 0.04, height * 0.16, 10), MAT.brightGold));
    needle.position.y = height * 0.92;
    group.add(needle);

    return group;
  }

  // 4. High-Detail Rattanakosin Phra Prang
  function createPrang(width, height, bodyMat, spireMat) {
    const group = new THREE.Group();
    const sMat = spireMat || MAT.brightGold;

    const baseLayers = 5;
    const baseTotalH = height * 0.30;
    const bLayerH = baseTotalH / baseLayers;
    for (let i = 0; i < baseLayers; i++) {
      const s = width * (1 - i * 0.085);
      const y = i * bLayerH + bLayerH / 2;

      const boxMain = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s, bLayerH * 0.94, s), bodyMat));
      boxMain.position.y = y;
      group.add(boxMain);

      const redentNS = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s * 0.68, bLayerH * 0.9, s * 1.14), bodyMat));
      redentNS.position.y = y;
      group.add(redentNS);

      const redentEW = addShadow(new THREE.Mesh(new THREE.BoxGeometry(s * 1.14, bLayerH * 0.9, s * 0.68), bodyMat));
      redentEW.position.y = y;
      group.add(redentEW);

      const goldBand = new THREE.Mesh(new THREE.BoxGeometry(s * 1.02, bLayerH * 0.14, s * 1.02), MAT.gold);
      goldBand.position.y = y + bLayerH * 0.42;
      group.add(goldBand);
    }

    const cellY = baseTotalH + height * 0.08;
    const cellW = width * 0.56;
    const cellH = height * 0.16;
    const cellCore = addShadow(new THREE.Mesh(new THREE.BoxGeometry(cellW, cellH, cellW), bodyMat));
    cellCore.position.y = cellY;
    group.add(cellCore);

    for (let d = 0; d < 4; d++) {
      const ang = (d * Math.PI) / 2;
      const porch = new THREE.Group();
      const pFrame = addShadow(new THREE.Mesh(new THREE.BoxGeometry(cellW * 0.48, cellH * 0.88, cellW * 0.28), bodyMat));
      porch.add(pFrame);

      const statue = new THREE.Mesh(new THREE.CylinderGeometry(cellW * 0.08, cellW * 0.11, cellH * 0.6, 8), MAT.brightGold);
      statue.position.z = cellW * 0.08;
      porch.add(statue);

      const pediment = addShadow(new THREE.Mesh(new THREE.ConeGeometry(cellW * 0.28, cellH * 0.52, 4), MAT.brightGold));
      pediment.position.set(0, cellH * 0.65, cellW * 0.04);
      pediment.rotation.y = Math.PI / 4;
      porch.add(pediment);

      porch.position.set(Math.sin(ang) * (cellW * 0.52), cellY, Math.cos(ang) * (cellW * 0.52));
      porch.rotation.y = ang;
      group.add(porch);
    }

    const spireBaseY = baseTotalH + cellH;
    const tiers = 9;
    const bodyHeight = height * 0.38;
    const tierH = bodyHeight / tiers;

    for (let t = 0; t < tiers; t++) {
      const progress = t / tiers;
      const curveFactor = Math.sin(progress * Math.PI * 0.55);
      const r = (width * 0.32) * (1 - curveFactor * 0.78);
      const y = spireBaseY + t * tierH + tierH / 2;

      const cyl = addShadow(new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.88, r, tierH * 0.92, 12),
        bodyMat
      ));
      cyl.position.y = y;
      group.add(cyl);

      if (t < tiers - 1) {
        for (let k = 0; k < 8; k++) {
          const kAng = (k * Math.PI) / 4;
          const petal = new THREE.Mesh(new THREE.ConeGeometry(r * 0.18, tierH * 0.75, 4), t % 2 === 0 ? MAT.gold : bodyMat);
          petal.position.set(Math.sin(kAng) * (r * 0.92), y, Math.cos(kAng) * (r * 0.92));
          petal.rotation.y = kAng + Math.PI / 4;
          group.add(petal);
        }
      }
    }

    const finialBaseY = spireBaseY + bodyHeight;
    const finialH = height * 0.16;
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(width * 0.018, width * 0.035, finialH, 8), sMat);
    rod.position.y = finialBaseY + finialH / 2;
    group.add(rod);

    for (let c = 0; c < 4; c++) {
      const diskR = width * (0.11 - c * 0.022);
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(diskR, diskR * 0.6, 0.14, 10), sMat);
      disk.position.y = finialBaseY + finialH * (0.22 + c * 0.18);
      group.add(disk);
    }

    return group;
  }

  // 5. MUSEUM-GRADE HYPER-REALISTIC YAKSHA GUARDIAN (FLAT MASCULINE WARRIOR CHEST)
  function createYakshaGuardian(scale, skinColorHex, brocadeColorHex, addBrassFence) {
    const s = scale || 1;
    const yak = new THREE.Group();

    const skinMat = new THREE.MeshStandardMaterial({
      color: skinColorHex || 0x0f766e,
      roughness: 0.26,
      metalness: 0.16
    });
    const brocadeTex = createYakshaBrocadeTexture(brocadeColorHex || '#b45309', '#1e3a8a');
    const brocadeMat = new THREE.MeshStandardMaterial({
      map: brocadeTex,
      bumpMap: brocadeTex,
      bumpScale: 0.05,
      metalness: 0.62,
      roughness: 0.22
    });
    allMaterials.push(skinMat, brocadeMat);

    const ped1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.38 * s, 0.45 * s, 2.38 * s), MAT.whiteStucco));
    ped1.position.y = 0.225 * s;
    yak.add(ped1);
    const ped2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.08 * s, 0.42 * s, 2.08 * s), MAT.whiteStucco));
    ped2.position.y = 0.66 * s;
    yak.add(ped2);
    const ped3 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.82 * s, 0.36 * s, 1.82 * s), MAT.whiteStucco));
    ped3.position.y = 1.05 * s;
    yak.add(ped3);

    if (addBrassFence !== false) {
      const fW = 1.28 * s;
      [
        [-fW, -fW], [0, -fW], [fW, -fW],
        [-fW, fW],  [0, fW],  [fW, fW],
        [-fW, 0],             [fW, 0]
      ].forEach(([px, pz]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.036 * s, 0.036 * s, 1.40 * s, 8), MAT.brassRailing);
        post.position.set(px, 0.70 * s, pz);
        yak.add(post);
        const finial = new THREE.Mesh(new THREE.SphereGeometry(0.06 * s, 8, 8), MAT.brightGold);
        finial.position.set(px, 1.42 * s, pz);
        yak.add(finial);
      });
      [0.75 * s, 1.32 * s].forEach(ry => {
        [-fW, fW].forEach(rz => {
          const railX = new THREE.Mesh(new THREE.CylinderGeometry(0.026 * s, 0.026 * s, fW * 2, 6), MAT.brassRailing);
          railX.rotation.z = Math.PI / 2;
          railX.position.set(0, ry, rz);
          yak.add(railX);

          const railZ = new THREE.Mesh(new THREE.CylinderGeometry(0.026 * s, 0.026 * s, fW * 2, 6), MAT.brassRailing);
          railZ.rotation.x = Math.PI / 2;
          railZ.position.set(rz, ry, 0);
          yak.add(railZ);
        });
      });

      const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.026 * s, 0.032 * s, 0.88 * s, 6), MAT.bronzeDark);
      signPost.position.set(-0.68 * s, 0.44 * s, 1.58 * s);
      yak.add(signPost);
      const signBoard = new THREE.Mesh(new THREE.BoxGeometry(0.56 * s, 0.25 * s, 0.05 * s), MAT.bronzeDark);
      signBoard.position.set(-0.68 * s, 0.88 * s, 1.58 * s);
      yak.add(signBoard);
    }

    [-0.36 * s, 0.36 * s].forEach((lx, idx) => {
      const side = idx === 0 ? -1 : 1;
      const shoe = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.34 * s, 0.22 * s, 0.65 * s), MAT.brightGold));
      shoe.position.set(lx, 1.32 * s, 0.12 * s);
      shoe.rotation.y = side * 0.26;
      yak.add(shoe);

      const shoeInlay = new THREE.Mesh(new THREE.BoxGeometry(0.26 * s, 0.16 * s, 0.52 * s), MAT.sapphireEnamel);
      shoeInlay.position.set(lx, 1.36 * s, 0.14 * s);
      shoeInlay.rotation.y = side * 0.26;
      yak.add(shoeInlay);

      const toe = new THREE.Mesh(new THREE.ConeGeometry(0.12 * s, 0.36 * s, 8), MAT.brightGold);
      toe.position.set(lx + side * 0.09 * s, 1.50 * s, 0.42 * s);
      toe.rotation.x = -0.38;
      yak.add(toe);

      for (let ar = 0; ar < 3; ar++) {
        const ankleRing = new THREE.Mesh(new THREE.CylinderGeometry(0.20 * s, 0.21 * s, 0.07 * s, 12), MAT.brightGold);
        ankleRing.position.set(lx, (1.44 + ar * 0.075) * s, 0);
        yak.add(ankleRing);
      }

      const shin = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.185 * s, 0.165 * s, 0.86 * s, 12), skinMat));
      shin.position.set(lx, 1.88 * s, 0);
      yak.add(shin);

      const kneeBand = new THREE.Mesh(new THREE.CylinderGeometry(0.24 * s, 0.21 * s, 0.22 * s, 12), MAT.brightGold);
      kneeBand.position.set(lx, 2.22 * s, 0);
      yak.add(kneeBand);

      const thigh = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.29 * s, 0.23 * s, 0.86 * s, 12), brocadeMat));
      thigh.position.set(lx, 2.60 * s, 0);
      yak.add(thigh);
    });

    const waistWrap = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.58 * s, 0.68 * s, 0.98 * s, 16), brocadeMat));
    waistWrap.position.y = 2.98 * s;
    yak.add(waistWrap);

    const beltBand = new THREE.Mesh(new THREE.CylinderGeometry(0.60 * s, 0.62 * s, 0.22 * s, 16), MAT.brightGold);
    beltBand.position.y = 3.35 * s;
    yak.add(beltBand);
    const beltBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.26 * s, 0.20 * s, 0.08 * s), MAT.rubyGem);
    beltBuckle.position.set(0, 3.35 * s, 0.60 * s);
    yak.add(beltBuckle);

    [-1, 1].forEach(side => {
      [0, 0.22].forEach((yShift, layerIdx) => {
        const wScale = 1 - layerIdx * 0.22;
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.quadraticCurveTo(side * 0.68 * s * wScale, -0.15 * s, side * 1.16 * s * wScale, 0.62 * s * wScale);
        wingShape.quadraticCurveTo(side * 0.58 * s * wScale, 0.48 * s * wScale, 0, 0.70 * s * wScale);
        wingShape.closePath();
        const wingGeom = new THREE.ExtrudeGeometry(wingShape, { depth: 0.14 * s, bevelEnabled: false });
        const wingMesh = addShadow(new THREE.Mesh(wingGeom, MAT.brightGold));
        wingMesh.position.set(side * 0.42 * s, (2.18 + yShift) * s, -0.07 * s);
        yak.add(wingMesh);
      });
    });

    const frontApron = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.44 * s, 1.22 * s, 0.18 * s), MAT.brightGold));
    frontApron.position.set(0, 2.58 * s, 0.56 * s);
    yak.add(frontApron);
    const innerApron = new THREE.Mesh(new THREE.BoxGeometry(0.28 * s, 1.10 * s, 0.21 * s), brocadeMat);
    innerApron.position.set(0, 2.62 * s, 0.57 * s);
    yak.add(innerApron);

    const torso = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.60 * s, 0.50 * s, 1.48 * s, 16), brocadeMat));
    torso.scale.set(1.06, 1.0, 0.84);
    torso.position.y = 3.98 * s;
    yak.add(torso);

    [-1, 1].forEach(side => {
      const chestStrap = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, 1.12 * s, 0.06 * s), MAT.brightGold);
      chestStrap.position.set(0, 4.04 * s, 0.46 * s);
      chestStrap.rotation.z = side * 0.48;
      yak.add(chestStrap);
    });
    const centerClasp = new THREE.Mesh(new THREE.BoxGeometry(0.22 * s, 0.22 * s, 0.08 * s), MAT.brightGold);
    centerClasp.position.set(0, 4.04 * s, 0.48 * s);
    centerClasp.rotation.z = Math.PI / 4;
    yak.add(centerClasp);

    for (let cl = 0; cl < 2; cl++) {
      const collar = new THREE.Mesh(new THREE.CylinderGeometry((0.58 - cl * 0.06) * s, (0.68 - cl * 0.06) * s, 0.18 * s, 16), MAT.brightGold);
      collar.position.y = (4.48 + cl * 0.12) * s;
      yak.add(collar);
    }

    [-1, 1].forEach(side => {
      const ep1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.56 * s, 0.20 * s, 0.56 * s), MAT.brightGold));
      ep1.position.set(side * 0.68 * s, 4.54 * s, 0);
      ep1.rotation.z = side * 0.38;
      yak.add(ep1);

      const epHorn = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.18 * s, 0.48 * s, 5), MAT.brightGold));
      epHorn.position.set(side * 0.92 * s, 4.78 * s, 0);
      epHorn.rotation.z = -side * 0.42;
      yak.add(epHorn);

      const upperArm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.15 * s, 0.86 * s, 10), brocadeMat));
      upperArm.position.set(side * 0.66 * s, 4.0 * s, 0.12 * s);
      upperArm.rotation.z = -side * 0.22;
      yak.add(upperArm);

      const bicepBand = new THREE.Mesh(new THREE.CylinderGeometry(0.175 * s, 0.175 * s, 0.16 * s, 10), MAT.brightGold);
      bicepBand.position.set(side * 0.66 * s, 4.06 * s, 0.12 * s);
      bicepBand.rotation.z = -side * 0.22;
      yak.add(bicepBand);

      const forearm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.145 * s, 0.135 * s, 0.74 * s, 10), MAT.brightGold));
      forearm.position.set(side * 0.36 * s, 3.55 * s, 0.42 * s);
      forearm.rotation.z = side * 0.95;
      forearm.rotation.x = 0.55;
      yak.add(forearm);
    });

    const upperHand = new THREE.Mesh(new THREE.BoxGeometry(0.34 * s, 0.19 * s, 0.28 * s), skinMat);
    upperHand.position.set(0, 3.62 * s, 0.68 * s);
    yak.add(upperHand);
    const lowerHand = new THREE.Mesh(new THREE.BoxGeometry(0.34 * s, 0.19 * s, 0.28 * s), skinMat);
    lowerHand.position.set(0, 3.38 * s, 0.68 * s);
    yak.add(lowerHand);
    [3.62 * s, 3.38 * s].forEach(hy => {
      const goldFingerRing = new THREE.Mesh(new THREE.SphereGeometry(0.048 * s, 8, 8), MAT.brightGold);
      goldFingerRing.position.set(0.11 * s, hy, 0.82 * s);
      yak.add(goldFingerRing);
    });

    const club = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.105 * s, 0.08 * s, 3.35 * s, 12), brocadeMat));
    club.position.set(0, 2.84 * s, 0.68 * s);
    yak.add(club);
    const clubTip = new THREE.Mesh(new THREE.ConeGeometry(0.14 * s, 0.36 * s, 10), MAT.brightGold);
    clubTip.position.set(0, 4.60 * s, 0.68 * s);
    yak.add(clubTip);

    const head = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.76 * s, 0.70 * s, 0.70 * s), skinMat));
    head.position.y = 5.04 * s;
    yak.add(head);

    [-0.24 * s, 0.24 * s].forEach(cx => {
      const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.16 * s, 10, 10), skinMat);
      cheek.position.set(cx, 4.98 * s, 0.28 * s);
      yak.add(cheek);
    });

    [-0.18 * s, 0.18 * s].forEach((ex, idx) => {
      const side = idx === 0 ? -1 : 1;
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.26 * s, 0.065 * s, 0.14 * s), MAT.brightGold);
      brow.position.set(ex, 5.24 * s, 0.35 * s);
      brow.rotation.z = side * 0.20;
      yak.add(brow);

      const eyeRim = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * s, 0.11 * s, 0.06 * s, 10), MAT.brightGold);
      eyeRim.rotation.x = Math.PI / 2;
      eyeRim.position.set(ex, 5.10 * s, 0.34 * s);
      yak.add(eyeRim);

      const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.098 * s, 10, 10), MAT.whiteStucco);
      eyeWhite.position.set(ex, 5.10 * s, 0.35 * s);
      yak.add(eyeWhite);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.052 * s, 8, 8), MAT.bronzeDark);
      pupil.position.set(ex, 5.10 * s, 0.42 * s);
      yak.add(pupil);
    });

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.09 * s, 0.20 * s, 8), skinMat);
    nose.position.set(0, 5.02 * s, 0.40 * s);
    nose.rotation.x = 0.32;
    yak.add(nose);

    const lipFrame = new THREE.Mesh(new THREE.BoxGeometry(0.54 * s, 0.16 * s, 0.14 * s), MAT.redDoor);
    lipFrame.position.set(0, 4.84 * s, 0.34 * s);
    yak.add(lipFrame);

    for (let tx = -0.18; tx <= 0.18; tx += 0.06) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.048 * s, 0.085 * s, 0.15 * s), MAT.whiteStucco);
      tooth.position.set(tx * s, 4.84 * s, 0.35 * s);
      yak.add(tooth);
    }

    [-0.24 * s, 0.24 * s].forEach((fx, idx) => {
      const side = idx === 0 ? -1 : 1;
      const fang = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.32 * s, 8), MAT.whiteStucco);
      fang.position.set(fx, 4.98 * s, 0.39 * s);
      fang.rotation.z = -side * 0.28;
      yak.add(fang);

      const mustacheScroll = new THREE.Mesh(new THREE.ConeGeometry(0.07 * s, 0.24 * s, 6), MAT.brightGold);
      mustacheScroll.position.set(fx * 1.25, 4.88 * s, 0.36 * s);
      mustacheScroll.rotation.z = side * 0.65;
      yak.add(mustacheScroll);
    });

    [-0.45 * s, 0.45 * s].forEach((kx, idx) => {
      const earWing = new THREE.Mesh(new THREE.ConeGeometry(0.17 * s, 0.66 * s, 6), MAT.brightGold);
      earWing.position.set(kx, 5.14 * s, 0);
      earWing.rotation.z = (idx === 0 ? 1 : -1) * 0.48;
      yak.add(earWing);
    });

    const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.44 * s, 0.48 * s, 0.34 * s, 14), MAT.brightGold);
    crownBase.position.y = 5.52 * s;
    yak.add(crownBase);

    const upperFaceBlock = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.40 * s, 0.36 * s, 0.40 * s), skinMat));
    upperFaceBlock.position.y = 5.84 * s;
    yak.add(upperFaceBlock);
    [-0.25 * s, 0.25 * s].forEach((ukx, idx) => {
      const uEar = new THREE.Mesh(new THREE.ConeGeometry(0.085 * s, 0.34 * s, 5), MAT.brightGold);
      uEar.position.set(ukx, 5.86 * s, 0);
      uEar.rotation.z = (idx === 0 ? 1 : -1) * 0.45;
      yak.add(uEar);
    });

    for (let c = 0; c < 5; c++) {
      const r = (0.32 - c * 0.052) * s;
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.85, r, 0.20 * s, 12), MAT.brightGold);
      ring.position.y = (6.12 + c * 0.20) * s;
      yak.add(ring);
    }
    const crownTip = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.095 * s, 1.02 * s, 12), MAT.brightGold));
    crownTip.position.y = 7.38 * s;
    yak.add(crownTip);

    return yak;
  }

  // 6. MUSEUM-GRADE LATHE-SCULPTED BRONZE-GOLD BUDDHA (SMOOTH FLAT-CHESTED THAI TORSO)
  function createBronzeMaraVijayaBuddha(scale) {
    const s = scale || 1;
    const buddha = new THREE.Group();
    const bMat = MAT.antiqueBronzeGold;

    const lotusBase = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(1.48 * s, 1.62 * s, 0.44 * s, 24), MAT.brightGold));
    lotusBase.position.y = 0.22 * s;
    buddha.add(lotusBase);

    for (let lp = 0; lp < 16; lp++) {
      const lAng = (lp * Math.PI * 2) / 16;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.22 * s, 10, 10), MAT.brightGold);
      petal.scale.set(0.85, 1.15, 0.55);
      petal.position.set(Math.sin(lAng) * 1.48 * s, 0.26 * s, Math.cos(lAng) * 1.48 * s);
      petal.rotation.y = lAng;
      buddha.add(petal);
    }

    const lap = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(1.20 * s, 1.40 * s, 0.48 * s, 24), bMat));
    lap.scale.set(1.18, 1.0, 0.78);
    lap.position.y = 0.62 * s;
    buddha.add(lap);

    [-1.10 * s, 1.10 * s].forEach(kx => {
      const knee = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.38 * s, 16, 16), bMat));
      knee.scale.set(1.2, 0.75, 1.0);
      knee.position.set(kx, 0.58 * s, 0.18 * s);
      buddha.add(knee);
    });

    const torsoPoints = [
      new THREE.Vector2(0.01 * s, 0.80 * s),
      new THREE.Vector2(0.72 * s, 0.80 * s),
      new THREE.Vector2(0.54 * s, 1.24 * s),
      new THREE.Vector2(0.72 * s, 1.82 * s),
      new THREE.Vector2(0.78 * s, 2.18 * s),
      new THREE.Vector2(0.30 * s, 2.30 * s),
      new THREE.Vector2(0.01 * s, 2.30 * s)
    ];
    const torsoGeom = new THREE.LatheGeometry(torsoPoints, 36);
    const torsoMesh = addShadow(new THREE.Mesh(torsoGeom, bMat));
    torsoMesh.scale.set(1.08, 1.0, 0.72);
    buddha.add(torsoMesh);

    const sanghati = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.28 * s, 1.24 * s, 0.10 * s), MAT.brightGold));
    sanghati.position.set(0.24 * s, 1.68 * s, 0.50 * s);
    sanghati.rotation.z = -0.15;
    buddha.add(sanghati);

    const rShoulder = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 16, 16), bMat));
    rShoulder.position.set(-0.84 * s, 2.12 * s, 0);
    buddha.add(rShoulder);
    const rUpperArm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.21 * s, 0.175 * s, 0.90 * s, 16), bMat));
    rUpperArm.position.set(-0.86 * s, 1.65 * s, 0.08 * s);
    rUpperArm.rotation.z = -0.12;
    buddha.add(rUpperArm);
    const rForearm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.17 * s, 0.145 * s, 0.84 * s, 16), bMat));
    rForearm.position.set(-0.82 * s, 1.05 * s, 0.42 * s);
    rForearm.rotation.x = 0.68;
    buddha.add(rForearm);
    const rHand = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.22 * s, 0.24 * s, 0.09 * s), bMat));
    rHand.position.set(-0.82 * s, 0.66 * s, 0.72 * s);
    rHand.rotation.x = 0.25;
    buddha.add(rHand);
    for (let f = -2; f <= 2; f++) {
      const rFinger = new THREE.Mesh(new THREE.CylinderGeometry(0.018 * s, 0.015 * s, 0.20 * s, 6), MAT.brightGold);
      rFinger.position.set((-0.82 + f * 0.038) * s, 0.50 * s, 0.76 * s);
      rFinger.rotation.x = 0.22;
      buddha.add(rFinger);
    }

    const lShoulder = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 16, 16), bMat));
    lShoulder.position.set(0.84 * s, 2.12 * s, 0);
    buddha.add(lShoulder);
    const lUpperArm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.21 * s, 0.175 * s, 0.90 * s, 16), bMat));
    lUpperArm.position.set(0.86 * s, 1.65 * s, 0.08 * s);
    lUpperArm.rotation.z = 0.12;
    buddha.add(lUpperArm);
    const lForearm = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.17 * s, 0.145 * s, 0.80 * s, 16), bMat));
    lForearm.position.set(0.45 * s, 1.02 * s, 0.42 * s);
    lForearm.rotation.z = 1.18;
    lForearm.rotation.x = 0.45;
    buddha.add(lForearm);
    const lHand = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.34 * s, 0.10 * s, 0.22 * s), bMat));
    lHand.position.set(0.05 * s, 0.88 * s, 0.56 * s);
    buddha.add(lHand);

    for (let nf = 0; nf < 3; nf++) {
      const neckFold = new THREE.Mesh(new THREE.CylinderGeometry((0.26 - nf * 0.01) * s, (0.28 - nf * 0.01) * s, 0.095 * s, 18), bMat);
      neckFold.position.set(0, (2.28 + nf * 0.085) * s, 0.04 * s);
      buddha.add(neckFold);
    }

    const headY = 2.76 * s;
    const head = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.43 * s, 28, 28), bMat));
    head.scale.set(0.92, 1.08, 0.96);
    head.position.set(0, headY, 0.05 * s);
    buddha.add(head);

    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.14 * s, 12, 12), bMat);
    chin.scale.set(1.15, 0.85, 0.9);
    chin.position.set(0, headY - 0.28 * s, 0.34 * s);
    buddha.add(chin);

    [-0.145 * s, 0.145 * s].forEach((bx, idx) => {
      const side = idx === 0 ? -1 : 1;
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.17 * s, 0.028 * s, 0.045 * s), MAT.brightGold);
      brow.position.set(bx, headY + 0.10 * s, 0.42 * s);
      brow.rotation.z = -side * 0.13;
      buddha.add(brow);

      const upperEyelid = new THREE.Mesh(new THREE.SphereGeometry(0.062 * s, 12, 12), bMat);
      upperEyelid.scale.set(1.3, 0.65, 0.65);
      upperEyelid.position.set(bx, headY + 0.028 * s, 0.415 * s);
      buddha.add(upperEyelid);

      const eyeSlit = new THREE.Mesh(new THREE.BoxGeometry(0.115 * s, 0.022 * s, 0.03 * s), MAT.whiteStucco);
      eyeSlit.position.set(bx, headY + 0.015 * s, 0.435 * s);
      buddha.add(eyeSlit);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.024 * s, 8, 8), MAT.bronzeDark);
      pupil.position.set(bx, headY + 0.015 * s, 0.45 * s);
      buddha.add(pupil);
    });

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.062 * s, 0.21 * s, 8), bMat);
    nose.position.set(0, headY - 0.02 * s, 0.45 * s);
    nose.rotation.x = 0.26;
    buddha.add(nose);

    const upperLip = new THREE.Mesh(new THREE.BoxGeometry(0.165 * s, 0.026 * s, 0.05 * s), MAT.brightGold);
    upperLip.position.set(0, headY - 0.155 * s, 0.425 * s);
    buddha.add(upperLip);
    const lowerLip = new THREE.Mesh(new THREE.BoxGeometry(0.15 * s, 0.028 * s, 0.05 * s), MAT.gold);
    lowerLip.position.set(0, headY - 0.185 * s, 0.42 * s);
    buddha.add(lowerLip);

    [-0.41 * s, 0.41 * s].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.048 * s, 0.028 * s, 0.48 * s, 10), bMat);
      ear.position.set(ex, headY - 0.05 * s, 0.04 * s);
      buddha.add(ear);
    });

    const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.42 * s, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), MAT.bronzeDark);
    hairCap.position.set(0, headY + 0.04 * s, 0.04 * s);
    buddha.add(hairCap);

    for (let ring = 0; ring < 3; ring++) {
      const rRad = (0.39 - ring * 0.08) * s;
      const rY = headY + (0.18 + ring * 0.10) * s;
      const curlCount = 14 - ring * 3;
      for (let c = 0; c < curlCount; c++) {
        const cAng = (c * Math.PI * 2) / curlCount;
        const curl = new THREE.Mesh(new THREE.SphereGeometry(0.042 * s, 6, 6), MAT.brightGold);
        curl.position.set(Math.sin(cAng) * rRad, rY, 0.04 * s + Math.cos(cAng) * rRad);
        buddha.add(curl);
      }
    }

    const ushnisha = new THREE.Mesh(new THREE.CylinderGeometry(0.17 * s, 0.23 * s, 0.22 * s, 16), MAT.bronzeDark);
    ushnisha.position.set(0, headY + 0.48 * s, 0.04 * s);
    buddha.add(ushnisha);

    const rasmi = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.115 * s, 0.56 * s, 12), MAT.brightGold));
    rasmi.position.set(0, headY + 0.82 * s, 0.04 * s);
    buddha.add(rasmi);

    return buddha;
  }

  // 7. HIGH-DETAIL 3D BANGKOK BMTA BUS
  function createBangkokBus(isEuroOrange, dir) {
    const bus = new THREE.Group();
    const d = dir || 1;
    const bodyMat = isEuroOrange ? MAT.busEuroOrange : MAT.busCreamRed;

    const chassis = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.88, 2.78, 8.95), bodyMat));
    chassis.position.y = 1.68;
    bus.add(chassis);

    [-1, 1].forEach(bEnd => {
      const bumper = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.98, 0.34, 0.30), MAT.whiteStucco));
      bumper.position.set(0, 0.58, bEnd * 4.48);
      bus.add(bumper);

      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.26, 0.08), MAT.ministryYellow);
      plate.position.set(0, 0.58, bEnd * 4.64);
      bus.add(plate);
    });

    const exhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.55, 8), MAT.bronzeDark);
    exhaustPipe.rotation.x = Math.PI / 2;
    exhaustPipe.position.set(1.12, 0.42, -d * 4.62);
    bus.add(exhaustPipe);

    const frontGrille = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.56, 0.10), MAT.bronzeDark);
    frontGrille.position.set(0, 1.05, d * 4.48);
    bus.add(frontGrille);
    for (let gs = -0.18; gs <= 0.18; gs += 0.12) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(1.80, 0.04, 0.12), MAT.whiteStucco);
      slat.position.set(0, 1.05 + gs, d * 4.49);
      bus.add(slat);
    }
    const bmtaBadge = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 12), MAT.brightGold);
    bmtaBadge.rotation.x = Math.PI / 2;
    bmtaBadge.position.set(0, 1.44, d * 4.49);
    bus.add(bmtaBadge);

    const roof = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.78, 0.28, 8.70), MAT.whiteStucco));
    roof.position.y = 3.18;
    bus.add(roof);

    if (isEuroOrange) {
      const acUnit = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.40, 3.95), MAT.whiteStucco);
      acUnit.position.set(0, 3.44, -0.3);
      bus.add(acUnit);
    } else {
      [-2.2, 1.8].forEach(vz => {
        const vent = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.20, 0.98), MAT.whiteStucco);
        vent.position.set(0, 3.36, vz);
        bus.add(vent);
      });
    }

    const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.66, 1.22, 0.12), MAT.lampGreen);
    windshield.position.set(0, 2.20, d * 4.48);
    bus.add(windshield);

    const rearWindshield = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.94, 0.12), MAT.lampGreen);
    rearWindshield.position.set(0, 2.22, -d * 4.48);
    bus.add(rearWindshield);

    [-0.58, 0.58].forEach(wx => {
      const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.68, 0.06), MAT.bronzeDark);
      wiper.position.set(wx, 1.88, d * 4.55);
      wiper.rotation.z = 0.22;
      bus.add(wiper);
    });

    const routeSign = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.40, 0.14), MAT.crystalGlow);
    routeSign.position.set(0, 2.88, d * 4.49);
    bus.add(routeSign);

    const driverHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), MAT.palaceCream);
    driverHead.position.set(d * 0.65, 2.25, d * 3.90);
    bus.add(driverHead);
    const driverBody = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 0.35), MAT.whiteStucco);
    driverBody.position.set(d * 0.65, 1.85, d * 3.90);
    bus.add(driverBody);

    [-1.10, 1.10].forEach(hx => {
      const headlight = new THREE.Mesh(new THREE.SphereGeometry(0.20, 10, 10), MAT.crystalGlow);
      headlight.position.set(hx, 0.98, d * 4.49);
      bus.add(headlight);

      const turnSignal = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.15, 0.10), MAT.gold);
      turnSignal.position.set(hx * 1.14, 1.25, d * 4.49);
      bus.add(turnSignal);

      const taillight = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.12), MAT.rubyGem);
      taillight.position.set(hx, 1.02, -d * 4.49);
      bus.add(taillight);

      const mirrorArm = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.08, 0.08), MAT.bronzeDark);
      mirrorArm.position.set(hx * 1.45, 2.28, d * 4.28);
      bus.add(mirrorArm);
      const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.48, 0.22), MAT.bronzeDark);
      mirrorGlass.position.set(hx * 1.56, 2.16, d * 4.34);
      bus.add(mirrorGlass);
    });

    [-1.46, 1.46].forEach(wx => {
      [-2.68, 2.68].forEach(wz => {
        const wheelArch = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.24, 14, 1, false, 0, Math.PI), MAT.bronzeDark);
        wheelArch.rotation.z = Math.PI / 2;
        wheelArch.position.set(wx * 0.96, 0.58, wz);
        bus.add(wheelArch);

        const tire = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.57, 0.57, 0.38, 16), MAT.bronzeDark));
        tire.rotation.z = Math.PI / 2;
        tire.position.set(wx, 0.57, wz);
        bus.add(tire);

        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.41, 12), MAT.whiteStucco);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(wx, 0.57, wz);
        bus.add(hub);

        const axleCap = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.44, 8), MAT.bronzeDark);
        axleCap.rotation.z = Math.PI / 2;
        axleCap.position.set(wx, 0.57, wz);
        bus.add(axleCap);
      });
    });

    return bus;
  }

  // 8. HIGH-DETAIL 3D THAI TUK-TUK
  function createThaiTukTuk(bodyColorHex, dir) {
    const tuktuk = new THREE.Group();
    const d = dir || 1;
    const bodyMat = new THREE.MeshStandardMaterial({
      color: bodyColorHex || 0x1d4ed8,
      metalness: 0.50,
      roughness: 0.20
    });
    allMaterials.push(bodyMat);

    const floorDeck = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.80, 0.26, 2.48), bodyMat));
    floorDeck.position.set(0, 0.46, -d * 0.25);
    tuktuk.add(floorDeck);

    const rearBackWall = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.80, 1.04, 0.24), bodyMat));
    rearBackWall.position.set(0, 1.02, -d * 1.40);
    tuktuk.add(rearBackWall);

    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.16, 0.18), MAT.whiteStucco);
    rearBumper.position.set(0, 0.42, -d * 1.54);
    tuktuk.add(rearBumper);

    const rearPlate = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.22, 0.06), MAT.ministryYellow);
    rearPlate.position.set(0, 0.68, -d * 1.54);
    tuktuk.add(rearPlate);

    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 8), MAT.whiteStucco);
    exhaust.rotation.x = Math.PI / 2;
    exhaust.position.set(0.62, 0.36, -d * 1.58);
    tuktuk.add(exhaust);

    [-0.86, 0.86].forEach(rx => {
      const sideRail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 1.15), MAT.whiteStucco);
      sideRail.position.set(rx, 0.88, -d * 0.72);
      tuktuk.add(sideRail);
    });

    const passengerSeat = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.36, 0.68), MAT.redDoor);
    passengerSeat.position.set(0, 0.72, -d * 0.94);
    tuktuk.add(passengerSeat);
    const passengerBack = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.54, 0.18), MAT.redDoor);
    passengerBack.position.set(0, 1.12, -d * 1.22);
    tuktuk.add(passengerBack);

    const driverSeat = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.32, 0.50), MAT.bronzeDark);
    driverSeat.position.set(0, 0.72, d * 0.34);
    tuktuk.add(driverSeat);

    const drvTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.20, 0.55, 8), MAT.royalBlueGlass);
    drvTorso.position.set(0, 1.12, d * 0.36);
    tuktuk.add(drvTorso);
    const drvHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), MAT.palaceCream);
    drvHead.position.set(0, 1.52, d * 0.38);
    tuktuk.add(drvHead);

    const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.76, 6), MAT.whiteStucco);
    handleBar.rotation.z = Math.PI / 2;
    handleBar.position.set(0, 1.18, d * 0.78);
    tuktuk.add(handleBar);

    [-0.42, 0.42].forEach((tx, idx) => {
      const shirtMat = idx === 0 ? MAT.pinkElephant : MAT.whiteStucco;
      const pTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.52, 8), shirtMat);
      pTorso.position.set(tx, 1.12, -d * 0.92);
      tuktuk.add(pTorso);
      const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.145, 10, 10), MAT.palaceCream);
      pHead.position.set(tx, 1.50, -d * 0.92);
      tuktuk.add(pHead);
      if (idx === 0) {
        const sunHat = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 0.08, 10), MAT.brightGold);
        sunHat.position.set(tx, 1.63, -d * 0.92);
        tuktuk.add(sunHat);
      }
    });

    const frontCowl = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.65, 1.08, 12), bodyMat));
    frontCowl.position.set(0, 0.88, d * 1.06);
    tuktuk.add(frontCowl);

    const yellowStripe = new THREE.Mesh(new THREE.CylinderGeometry(0.57, 0.60, 0.18, 12), MAT.brightGold);
    yellowStripe.position.set(0, 0.82, d * 1.07);
    tuktuk.add(yellowStripe);

    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.82, 0.10), MAT.royalBlueGlass);
    windshield.position.set(0, 1.56, d * 0.88);
    windshield.rotation.x = -d * 0.18;
    tuktuk.add(windshield);

    const taxiSign = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.28, 0.26), MAT.crystalGlow);
    taxiSign.position.set(0, 2.12, d * 0.82);
    tuktuk.add(taxiSign);

    const centerLight = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), MAT.crystalGlow);
    centerLight.position.set(0, 0.96, d * 1.62);
    tuktuk.add(centerLight);
    [-0.48, 0.48].forEach(lx => {
      const turnLamp = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 8), MAT.gold);
      turnLamp.position.set(lx, 0.92, d * 1.40);
      tuktuk.add(turnLamp);

      const mirror = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), MAT.whiteStucco);
      mirror.position.set(lx * 1.65, 1.48, d * 0.92);
      tuktuk.add(mirror);
    });

    const roofCanopy = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.18, 2.48), MAT.ministryYellow));
    roofCanopy.position.set(0, 2.04, -d * 0.22);
    tuktuk.add(roofCanopy);

    const roofFringe = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.11, 2.52), MAT.redDoor);
    roofFringe.position.set(0, 1.92, -d * 0.22);
    tuktuk.add(roofFringe);

    [-0.82, 0.82].forEach(px => {
      [-1.28, 0.68].forEach(pz => {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 1.30, 8), MAT.whiteStucco);
        bar.position.set(px, 1.38, d * pz);
        tuktuk.add(bar);
      });
    });

    const frontWheel = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.24, 14), MAT.bronzeDark));
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0, 0.36, d * 1.42);
    tuktuk.add(frontWheel);
    const frontHub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.27, 10), MAT.whiteStucco);
    frontHub.rotation.z = Math.PI / 2;
    frontHub.position.set(0, 0.36, d * 1.42);
    tuktuk.add(frontHub);
    const frontFender = new THREE.Mesh(new THREE.SphereGeometry(0.39, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), MAT.brightGold);
    frontFender.position.set(0, 0.42, d * 1.42);
    tuktuk.add(frontFender);

    [-0.92, 0.92].forEach(wx => {
      const rearWheel = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.26, 14), MAT.bronzeDark));
      rearWheel.rotation.z = Math.PI / 2;
      rearWheel.position.set(wx, 0.38, -d * 0.94);
      tuktuk.add(rearWheel);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.29, 10), MAT.whiteStucco);
      hub.rotation.z = Math.PI / 2;
      hub.position.set(wx, 0.38, -d * 0.94);
      tuktuk.add(hub);
    });

    return tuktuk;
  }

  // 9. 3D BANGKOK TWO-TONE TAXI-METER
  function createBangkokTaxi(lowerColorHex, upperColorHex, dir) {
    const taxi = new THREE.Group();
    const d = dir || 1;
    const lowMat = new THREE.MeshStandardMaterial({ color: lowerColorHex || 0x16a34a, metalness: 0.48, roughness: 0.20 });
    const upMat = new THREE.MeshStandardMaterial({ color: upperColorHex || 0xfacc15, metalness: 0.48, roughness: 0.20 });
    allMaterials.push(lowMat, upMat);

    const bodyLow = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.68, 4.42), lowMat));
    bodyLow.position.y = 0.68;
    taxi.add(bodyLow);

    [-1, 1].forEach(bEnd => {
      const bumper = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.22, 0.18), lowMat);
      bumper.position.set(0, 0.46, bEnd * 2.22);
      taxi.add(bumper);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.18, 0.06), MAT.ministryYellow);
      plate.position.set(0, 0.48, bEnd * 2.31);
      taxi.add(plate);
    });

    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.24, 0.08), MAT.bronzeDark);
    grille.position.set(0, 0.72, d * 2.22);
    taxi.add(grille);

    const cabin = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.70, 0.64, 2.30), upMat));
    cabin.position.set(0, 1.30, -d * 0.15);
    taxi.add(cabin);

    const glassBand = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.50, 2.18), MAT.lampGreen);
    glassBand.position.set(0, 1.28, -d * 0.15);
    taxi.add(glassBand);

    const taxiSign = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.24, 0.34), MAT.crystalGlow);
    taxiSign.position.set(0, 1.74, d * 0.10);
    taxi.add(taxiSign);

    [-0.70, 0.70].forEach(lx => {
      const hl = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), MAT.crystalGlow);
      hl.position.set(lx, 0.74, d * 2.22);
      taxi.add(hl);
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.20, 0.08), MAT.rubyGem);
      tl.position.set(lx, 0.76, -d * 2.22);
      taxi.add(tl);

      const wingMirror = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.14), upMat);
      wingMirror.position.set(lx * 1.38, 1.08, d * 0.65);
      taxi.add(wingMirror);
    });

    [-0.98, 0.98].forEach(wx => {
      [-1.35, 1.35].forEach(wz => {
        const wheel = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.24, 12), MAT.bronzeDark));
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.36, wz);
        taxi.add(wheel);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.26, 8), MAT.whiteStucco);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(wx, 0.36, wz);
        taxi.add(hub);
      });
    });

    return taxi;
  }

  // 10. ARTICULATED 3D HUMAN FIGURE: TOURISTS, GUIDES, MONKS, WORSHIPPERS & GUARDS
  function createPersonFigure(options) {
    const opts = options || {};
    const s = opts.scale || 1.0;
    const role = opts.role || 'tourist';
    const pose = opts.pose || 'walk';

    const person = new THREE.Group();

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.42 });
    const shirtColor = role === 'monk' ? 0xd97706
      : role === 'guard' ? 0xffffff
      : role === 'worshipper' ? 0xf8fafc
      : (opts.shirtColor || 0x0284c7);
    const pantsColor = role === 'monk' ? 0xb45309
      : role === 'guard' ? 0x1e293b
      : (opts.pantsColor || 0x334155);

    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.48 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.55 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.65 });
    allMaterials.push(skinMat, shirtMat, pantsMat, hairMat);

    const leftLeg = new THREE.Group();
    leftLeg.position.set(-0.12 * s, 0.85 * s, 0);
    const lLegMesh = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.085 * s, 0.07 * s, 0.82 * s, 8), pantsMat));
    lLegMesh.position.y = -0.41 * s;
    leftLeg.add(lLegMesh);
    const lShoe = new THREE.Mesh(new THREE.BoxGeometry(0.14 * s, 0.10 * s, 0.25 * s), hairMat);
    lShoe.position.set(0, -0.80 * s, 0.04 * s);
    leftLeg.add(lShoe);
    person.add(leftLeg);

    const rightLeg = new THREE.Group();
    rightLeg.position.set(0.12 * s, 0.85 * s, 0);
    const rLegMesh = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.085 * s, 0.07 * s, 0.82 * s, 8), pantsMat));
    rLegMesh.position.y = -0.41 * s;
    rightLeg.add(rLegMesh);
    const rShoe = new THREE.Mesh(new THREE.BoxGeometry(0.14 * s, 0.10 * s, 0.25 * s), hairMat);
    rShoe.position.set(0, -0.80 * s, 0.04 * s);
    rightLeg.add(rShoe);
    person.add(rightLeg);

    const torso = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.18 * s, 0.68 * s, 12), shirtMat));
    torso.position.y = 1.18 * s;
    person.add(torso);

    const collarRing = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.16 * s, 0.08 * s, 10), MAT.whiteStucco);
    collarRing.position.y = 1.52 * s;
    person.add(collarRing);

    if (role === 'worshipper') {
      const goldBelt = new THREE.Mesh(new THREE.CylinderGeometry(0.19 * s, 0.195 * s, 0.08 * s, 12), MAT.brightGold);
      goldBelt.position.y = 0.88 * s;
      person.add(goldBelt);
    } else if (role === 'tourist' || role === 'guide') {
      const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.28 * s, 0.38 * s, 0.16 * s), pantsMat);
      backpack.position.set(0, 1.20 * s, -0.20 * s);
      person.add(backpack);

      const strap = new THREE.Mesh(new THREE.BoxGeometry(0.05 * s, 0.62 * s, 0.38 * s), hairMat);
      strap.position.set(0, 1.20 * s, 0);
      strap.rotation.z = 0.42;
      person.add(strap);
    } else if (role === 'monk') {
      const yamm = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, 0.28 * s, 0.24 * s), MAT.redDoor);
      yamm.position.set(0.24 * s, 0.96 * s, 0.05 * s);
      person.add(yamm);
    } else if (role === 'guard') {
      const goldEp1 = new THREE.Mesh(new THREE.BoxGeometry(0.52 * s, 0.08 * s, 0.24 * s), MAT.brightGold);
      goldEp1.position.set(0, 1.48 * s, 0);
      person.add(goldEp1);
    }

    const head = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.165 * s, 14, 14), skinMat));
    head.position.y = 1.70 * s;
    person.add(head);

    [-0.055 * s, 0.055 * s].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.022 * s, 6, 6), hairMat);
      eye.position.set(ex, 1.72 * s, 0.15 * s);
      person.add(eye);
    });
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.024 * s, 0.06 * s, 6), skinMat);
    nose.position.set(0, 1.69 * s, 0.17 * s);
    nose.rotation.x = 0.35;
    person.add(nose);

    if (role !== 'monk') {
      const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.172 * s, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), hairMat);
      hairCap.position.y = 1.72 * s;
      person.add(hairCap);
      if (role === 'worshipper') {
        const hairBun = new THREE.Mesh(new THREE.SphereGeometry(0.075 * s, 8, 8), hairMat);
        hairBun.position.set(0, 1.76 * s, -0.16 * s);
        person.add(hairBun);
      }
    }

    if (opts.hat || role === 'guard' || role === 'guide') {
      const hatMat = role === 'guard' ? MAT.whiteStucco : MAT.palaceCream;
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.29 * s, 0.31 * s, 0.04 * s, 12), hatMat);
      brim.position.y = 1.82 * s;
      person.add(brim);
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.17 * s, 0.14 * s, 12), hatMat);
      crown.position.y = 1.89 * s;
      person.add(crown);
      const hatRibbon = new THREE.Mesh(new THREE.CylinderGeometry(0.165 * s, 0.168 * s, 0.035 * s, 12), MAT.redDoor);
      hatRibbon.position.y = 1.84 * s;
      person.add(hatRibbon);
      if (role === 'guard') {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04 * s, 0.15 * s, 6), MAT.brightGold);
        spike.position.y = 2.00 * s;
        person.add(spike);
      }
    }

    const leftArm = new THREE.Group();
    leftArm.position.set(-0.26 * s, 1.44 * s, 0);
    const lArmMesh = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.06 * s, 0.05 * s, 0.56 * s, 8), shirtMat));
    lArmMesh.position.y = -0.26 * s;
    leftArm.add(lArmMesh);
    const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.055 * s, 8, 8), skinMat);
    lHand.position.y = -0.54 * s;
    leftArm.add(lHand);
    person.add(leftArm);

    const rightArm = new THREE.Group();
    rightArm.position.set(0.26 * s, 1.44 * s, 0);
    const rArmMesh = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.06 * s, 0.05 * s, 0.56 * s, 8), skinMat));
    rArmMesh.position.y = -0.26 * s;
    rightArm.add(rArmMesh);
    const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.055 * s, 8, 8), skinMat);
    rHand.position.y = -0.54 * s;
    rightArm.add(rHand);
    person.add(rightArm);

    if (pose === 'photo') {
      leftArm.rotation.x = -1.15;
      rightArm.rotation.x = -1.15;
      const camBox = new THREE.Mesh(new THREE.BoxGeometry(0.20 * s, 0.14 * s, 0.12 * s), MAT.bronzeDark);
      camBox.position.set(0, 1.56 * s, 0.34 * s);
      person.add(camBox);
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * s, 0.05 * s, 0.12 * s, 8), MAT.whiteStucco);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, 1.56 * s, 0.44 * s);
      person.add(lens);
    } else if (pose === 'umbrella') {
      rightArm.rotation.x = -0.85;
      const uPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02 * s, 0.02 * s, 1.08 * s, 6), MAT.whiteStucco);
      uPole.position.set(0.24 * s, 1.85 * s, 0.18 * s);
      person.add(uPole);
      const uMat = new THREE.MeshStandardMaterial({ color: opts.umbrellaColor || 0xec4899, roughness: 0.4, side: THREE.DoubleSide });
      allMaterials.push(uMat);
      const uCanopy = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.72 * s, 0.34 * s, 14), uMat));
      uCanopy.position.set(0.24 * s, 2.38 * s, 0.18 * s);
      person.add(uCanopy);
      const uTop = new THREE.Mesh(new THREE.ConeGeometry(0.26 * s, 0.18 * s, 10), MAT.brightGold);
      uTop.position.set(0.24 * s, 2.54 * s, 0.18 * s);
      person.add(uTop);
    } else if (pose === 'guide') {
      rightArm.rotation.x = -1.45;
      const fPole = new THREE.Mesh(new THREE.CylinderGeometry(0.018 * s, 0.018 * s, 1.15 * s, 6), MAT.whiteStucco);
      fPole.position.set(0.26 * s, 2.15 * s, 0.22 * s);
      person.add(fPole);
      const gFlag = new THREE.Mesh(new THREE.BoxGeometry(0.04 * s, 0.28 * s, 0.42 * s), MAT.rubyGem);
      gFlag.position.set(0.26 * s, 2.58 * s, 0.42 * s);
      person.add(gFlag);
    } else if (pose === 'wai') {
      leftArm.rotation.x = -0.95;
      leftArm.rotation.z = -0.35;
      rightArm.rotation.x = -0.95;
      rightArm.rotation.z = 0.35;
      const lotus = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.18 * s, 8), MAT.pinkElephant);
      lotus.position.set(0, 1.38 * s, 0.28 * s);
      person.add(lotus);
    }

    person.userData = { leftLeg, rightLeg, leftArm, rightArm, pose };
    return person;
  }

  // 11. Blooming Porcelain Lotus Basin (อ่างบัวลายครามปลูกบัวหลวงบานสะพรั่ง)
  function createLotusBasin(x, y, z, scale) {
    const s = scale || 1.0;
    const g = new THREE.Group();
    const basin = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.68 * s, 0.46 * s, 0.62 * s, 14), MAT.blueCeramicWall));
    basin.position.y = 0.31 * s;
    g.add(basin);

    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.62 * s, 0.62 * s, 0.06 * s, 14), MAT.riverWater);
    water.position.y = 0.58 * s;
    g.add(water);

    for (let l = 0; l < 5; l++) {
      const ang = (l * Math.PI * 2) / 5;
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * s, 0.18 * s, 0.03 * s, 10), MAT.lawnGrass);
      pad.position.set(Math.sin(ang) * 0.32 * s, 0.62 * s, Math.cos(ang) * 0.32 * s);
      g.add(pad);

      const bloom = new THREE.Mesh(new THREE.ConeGeometry(0.08 * s, 0.22 * s, 8), l % 2 === 0 ? MAT.pinkElephant : MAT.whiteStucco);
      bloom.position.set(Math.sin(ang) * 0.28 * s, 0.78 * s, Math.cos(ang) * 0.28 * s);
      g.add(bloom);
    }

    g.position.set(x, y, z);
    return g;
  }

  // 12. Ornate Bronze Tripodal Censer & Candle Offering Stand (กระถางธูปสามขาสำริดและเชิงเทียนบูชาพระรัตนตรัย)
  function createBronzeCenserAltar(x, y, z, scale) {
    const s = scale || 1.0;
    const g = new THREE.Group();
    const plinth = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.6 * s, 0.45 * s, 1.4 * s), MAT.whiteStucco));
    plinth.position.y = 0.225 * s;
    g.add(plinth);

    const censerBowl = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.45 * s, 0.32 * s, 0.52 * s, 14), MAT.bronzeDark));
    censerBowl.position.y = 0.85 * s;
    g.add(censerBowl);

    for (let leg = 0; leg < 3; leg++) {
      const lAng = (leg * Math.PI * 2) / 3;
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * s, 0.05 * s, 0.42 * s, 8), MAT.brightGold);
      foot.position.set(Math.sin(lAng) * 0.28 * s, 0.56 * s, Math.cos(lAng) * 0.28 * s);
      g.add(foot);
    }

    // Glowing Incense Sticks in Censer
    for (let i = -3; i <= 3; i++) {
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012 * s, 0.012 * s, 0.36 * s, 4), MAT.redDoor);
      stick.position.set(i * 0.045 * s, 1.18 * s, (i % 2) * 0.04 * s);
      g.add(stick);
    }

    // Pair of Golden Candle Stands flanking the Censer
    [-0.95 * s, 0.95 * s].forEach(cx => {
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.24 * s, 0.65 * s, 10), MAT.brightGold);
      stand.position.set(cx, 0.78 * s, 0);
      g.add(stand);
      const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.045 * s, 0.045 * s, 0.35 * s, 8), MAT.ministryYellow);
      candle.position.set(cx, 1.25 * s, 0);
      g.add(candle);
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.04 * s, 0.12 * s, 6), MAT.crystalGlow);
      flame.position.set(cx, 1.48 * s, 0);
      g.add(flame);
    });

    g.position.set(x, y, z);
    return g;
  }

  // 13. Chao Phraya Express Boat & Traditional Thai Longtail Boat (เรือด่วนเจ้าพระยาธงส้มและเรือหางยาวไทย)
  function createChaoPhrayaBoat(isExpressBoat, dir) {
    const boat = new THREE.Group();
    const d = dir || 1;

    if (isExpressBoat) {
      const hull = addShadow(new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.95, 13.5), MAT.whiteStucco));
      hull.position.y = 0.45;
      boat.add(hull);

      const bow = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.7, 3.6, 4), MAT.whiteStucco));
      bow.rotation.x = d * Math.PI / 2;
      bow.rotation.y = Math.PI / 4;
      bow.position.set(0, 0.45, d * 8.4);
      boat.add(bow);

      const blueStripe = new THREE.Mesh(new THREE.BoxGeometry(3.46, 0.22, 13.5), MAT.sapphireEnamel);
      blueStripe.position.y = 0.72;
      boat.add(blueStripe);

      const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.1, 10.8), MAT.teakWoodColumn);
      cabin.position.y = 1.35;
      boat.add(cabin);

      const roof = addShadow(new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.22, 11.6), MAT.busEuroOrange));
      roof.position.y = 2.02;
      boat.add(roof);

      const orangeFlag = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.65, 0.95), MAT.busEuroOrange);
      orangeFlag.position.set(0, 2.55, d * 5.6);
      boat.add(orangeFlag);
    } else {
      // Traditional Thai Longtail Boat (เรือหางยาวไทยประดับผ้าสามสีหัวเรือ)
      const hull = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.62, 6.8), MAT.teakWoodColumn));
      hull.position.y = 0.32;
      boat.add(hull);

      const bowProw = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.2, 6), MAT.brightGold));
      bowProw.position.set(0, 1.05, d * 3.8);
      bowProw.rotation.x = d * 0.55;
      boat.add(bowProw);

      const garland = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), MAT.pinkElephant);
      garland.position.set(0, 1.45, d * 4.2);
      boat.add(garland);

      const canopy = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.16, 4.4), MAT.sapphireEnamel));
      canopy.position.set(0, 1.48, -d * 0.2);
      boat.add(canopy);
    }

    return boat;
  }

  // 14. Tiered Lotus-Bud Pinnacle
  function createPhumKhaoBinPinnacle(scale) {
    const s = scale || 1;
    const g = new THREE.Group();

    const base1 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(2.2 * s, 1.1 * s, 2.2 * s), MAT.whiteStucco));
    base1.position.y = 0.55 * s;
    g.add(base1);
    const base2 = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.65 * s, 1.2 * s, 1.65 * s), MAT.blueCeramicWall));
    base2.position.y = 1.7 * s;
    g.add(base2);

    const chalice = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.95 * s, 0.52 * s, 0.9 * s, 10), MAT.brightGold));
    chalice.position.y = 2.75 * s;
    g.add(chalice);

    for (let t = 0; t < 6; t++) {
      const r = (0.78 - t * 0.11) * s;
      const y = (3.4 + t * 0.52) * s;
      const tierMain = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.75, r, 0.36 * s, 10), MAT.royalBlueGlass));
      tierMain.position.y = y;
      g.add(tierMain);
      const tierWhite = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.04, r * 1.04, 0.12 * s, 10), MAT.whiteStucco);
      tierWhite.position.y = y - 0.18 * s;
      g.add(tierWhite);
    }

    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.15 * s, 0.85 * s, 8), MAT.brightGold);
    tip.position.y = 6.8 * s;
    g.add(tip);

    return g;
  }

  // 15. Vintage Cast-Iron Lamp Post
  function createVintageLampPost(scale) {
    const s = scale || 1;
    const g = new THREE.Group();
    const pole = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.14 * s, 4.6 * s, 8), MAT.lampGreen));
    pole.position.y = 2.3 * s;
    g.add(pole);

    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.32 * s, 10, 10), MAT.crystalGlow);
    lantern.position.y = 4.75 * s;
    g.add(lantern);

    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.38 * s, 0.45 * s, 8), MAT.brightGold);
    cap.position.y = 5.1 * s;
    g.add(cap);

    return g;
  }

  // 16. Golden Kinnaree Statue
  function createKinnareeStatue(scale) {
    const s = scale || 1;
    const g = new THREE.Group();
    const ped = addShadow(new THREE.Mesh(new THREE.BoxGeometry(1.0 * s, 1.0 * s, 1.0 * s), MAT.whiteStucco));
    ped.position.y = 0.5 * s;
    g.add(ped);

    const body = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.3 * s, 1.3 * s, 8), MAT.brightGold));
    body.position.y = 1.65 * s;
    g.add(body);

    const tail = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.25 * s, 1.1 * s, 6), MAT.brightGold));
    tail.position.set(0, 1.8 * s, -0.35 * s);
    tail.rotation.x = -0.7;
    g.add(tail);

    const spire = addShadow(new THREE.Mesh(new THREE.ConeGeometry(0.16 * s, 0.85 * s, 8), MAT.brightGold));
    spire.position.y = 2.7 * s;
    g.add(spire);
    return g;
  }

  // 17. Fan-Shaped Traveler's Palm
  function createTravelersPalm(x, y, z, scale, rotY) {
    const s = scale || 1;
    const g = new THREE.Group();
    const pot = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.55 * s, 0.42 * s, 0.8 * s, 10), MAT.blueCeramicWall));
    pot.position.y = 0.4 * s;
    g.add(pot);

    for (let f = -5; f <= 5; f++) {
      const ang = f * 0.19;
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * s, 0.06 * s, 2.8 * s, 6), MAT.lawnGrass);
      stem.position.set(Math.sin(ang) * 1.1 * s, (1.8 + Math.cos(ang) * 0.6) * s, 0);
      stem.rotation.z = -ang;
      g.add(stem);

      const leaf = addShadow(new THREE.Mesh(new THREE.BoxGeometry(0.48 * s, 1.45 * s, 0.06 * s), MAT.treeFoliage));
      leaf.position.set(Math.sin(ang) * 2.1 * s, (2.6 + Math.cos(ang) * 1.1) * s, 0);
      leaf.rotation.z = -ang;
      g.add(leaf);
    }

    g.position.set(x, y, z);
    g.rotation.y = rotY || 0;
    return g;
  }

  // 18. Manicured Thai Topiary/Bonsai Trees
  function createThaiTree(x, y, z, scale) {
    const s = scale || 1;
    const tree = new THREE.Group();
    const trunk = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.2 * s, 0.34 * s, 2.4 * s, 8), MAT.trunk));
    trunk.position.y = 1.2 * s;
    tree.add(trunk);

    const puffs = [
      [0, 2.9 * s, 0, 1.35 * s],
      [-0.85 * s, 2.25 * s, 0.45 * s, 0.92 * s],
      [0.85 * s, 2.35 * s, -0.45 * s, 0.95 * s],
      [0, 3.75 * s, 0, 0.92 * s],
      [0.4 * s, 2.6 * s, 0.7 * s, 0.82 * s]
    ];
    puffs.forEach(([px, py, pz, pr]) => {
      const foliage = addShadow(new THREE.Mesh(new THREE.SphereGeometry(pr, 10, 10), MAT.treeFoliage));
      foliage.position.set(px, py, pz);
      foliage.scale.y = 0.76;
      tree.add(foliage);
    });

    tree.position.set(x, y, z);
    return tree;
  }

  // 19. Tall Conical Topiary Tree
  function createConicalTopiaryTree(x, y, z, scale) {
    const s = scale || 1;
    const g = new THREE.Group();
    const trunk = addShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.24 * s, 0.36 * s, 2.2 * s, 10), MAT.trunk));
    trunk.position.y = 1.1 * s;
    g.add(trunk);

    const cone1 = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.95 * s, 4.8 * s, 16), MAT.manicuredHedge));
    cone1.position.y = 4.1 * s;
    g.add(cone1);
    const cone2 = addShadow(new THREE.Mesh(new THREE.ConeGeometry(1.45 * s, 3.6 * s, 16), MAT.treeFoliage));
    cone2.position.y = 5.2 * s;
    g.add(cone2);

    g.position.set(x, y, z);
    return g;
  }

  return {
    addShadow,
    createThaiRoof,
    createChedi,
    createRedentedGoldenChedi,
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
    createPhumKhaoBinPinnacle,
    createVintageLampPost,
    createKinnareeStatue,
    createTravelersPalm,
    createThaiTree,
    createConicalTopiaryTree
  };
})();
