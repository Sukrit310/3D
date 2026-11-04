// ============================================================================
// MODULE 1: ULTRA-REALISTIC PBR TEXTURES & BUMP RELIEF MAPS
//           (ลวดลายผนังบัวเอวขันทอง, เครื่องทรงพระแก้วมรกต 3 ฤดู, เกราะยักษ์ 512px,
//            กระเบื้องหลังคาเกล็ดเต่า และลวดลายรถเมล์ ขสมก. รอบคันความคมชัดสูง)
// ============================================================================

window.WPKTextures = (function () {
  function createEnvMap() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#0284c7');
    grad.addColorStop(0.28, '#38bdf8');
    grad.addColorStop(0.46, '#f0f9ff');
    grad.addColorStop(0.50, '#fef08a');
    grad.addColorStop(0.64, '#f59e0b');
    grad.addColorStop(0.84, '#b45309');
    grad.addColorStop(1.0, '#451a03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    const sun = ctx.createRadialGradient(210, 92, 8, 210, 92, 135);
    sun.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    sun.addColorStop(0.3, 'rgba(254, 240, 138, 0.95)');
    sun.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, 512, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.needsUpdate = true;
    return tex;
  }

  // 1. High-Res Fish-Scale Glazed Thai Roof Tiles + Deep Relief Bump Map
  function createThaiRoofMaps(options) {
    const opts = options || {};
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 1024;
    bumpCanvas.height = 1024;
    const bCtx = bumpCanvas.getContext('2d');

    ctx.fillStyle = opts.borderColor || '#0f5132';
    ctx.fillRect(0, 0, 1024, 1024);
    bCtx.fillStyle = '#707070';
    bCtx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(20, 20, 984, 984);
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(20, 20, 984, 984);

    ctx.fillStyle = '#15803d';
    ctx.fillRect(34, 34, 956, 956);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(52, 52, 920, 920);

    const orangeGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    orangeGrad.addColorStop(0, opts.mainColor || '#ea580c');
    orangeGrad.addColorStop(0.5, opts.midColor || '#f59e0b');
    orangeGrad.addColorStop(1, opts.mainColor || '#c2410c');
    ctx.fillStyle = orangeGrad;
    ctx.fillRect(62, 62, 900, 900);

    if (opts.innerBlue) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(168, 168, 688, 688);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(180, 180, 664, 664);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(194, 194, 636, 636);

      const blueGrad = ctx.createLinearGradient(0, 204, 0, 820);
      blueGrad.addColorStop(0, '#1e3a8a');
      blueGrad.addColorStop(0.5, '#1d4ed8');
      blueGrad.addColorStop(1, '#172554');
      ctx.fillStyle = blueGrad;
      ctx.fillRect(204, 204, 616, 616);
    }

    const tileW = 18;
    const tileH = 22;
    for (let y = 0; y < 1024; y += tileH) {
      const rowOffset = ((y / tileH) % 2) * (tileW / 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(0, y, 1024, 3);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.fillRect(0, y + 3, 1024, 2);

      bCtx.fillStyle = '#181818';
      bCtx.fillRect(0, y, 1024, 4);
      bCtx.fillStyle = '#e2e2e2';
      bCtx.fillRect(0, y + 4, 1024, tileH - 4);

      for (let x = -tileW; x < 1024; x += tileW) {
        const tx = x + rowOffset;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(tx + tileW / 2, y + tileH - 4, tileW / 2, 0, Math.PI);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.13)';
        ctx.fillRect(tx + tileW * 0.35, y + 4, tileW * 0.3, tileH - 8);

        bCtx.strokeStyle = '#252525';
        bCtx.lineWidth = 2.2;
        bCtx.beginPath();
        bCtx.arc(tx + tileW / 2, y + tileH - 4, tileW / 2, 0, Math.PI);
        bCtx.stroke();
        bCtx.fillStyle = '#ffffff';
        bCtx.fillRect(tx + tileW * 0.38, y + 5, tileW * 0.24, tileH - 9);
      }
    }

    ctx.fillStyle = '#fde047';
    for (let i = 14; i < 1010; i += 20) {
      ctx.beginPath();
      ctx.arc(i, 11, 6.5, 0, Math.PI * 2);
      ctx.arc(i, 1013, 6.5, 0, Math.PI * 2);
      ctx.arc(11, i, 6.5, 0, Math.PI * 2);
      ctx.arc(1013, i, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const map = new THREE.CanvasTexture(canvas);
    map.anisotropy = 4;
    map.needsUpdate = true;

    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    bumpMap.anisotropy = 4;
    bumpMap.needsUpdate = true;

    return { map, bumpMap };
  }

  // 2. Ornate Thai Stucco Wall with Golden Lotus Dado & Cornice Friezes (ผนังปูนขาวประดับบัวหัวผนังและบัวเชิงผนังลายกระจังทอง)
  function createCreamGoldStuccoWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fafaf9';
    ctx.fillRect(0, 0, 512, 256);

    // Subtle ashlar stone / stucco coursing lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
    ctx.lineWidth = 1.5;
    for (let y = 32; y < 224; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Top & Bottom Golden Lotus Frieze Bands (บัวหัวผนังและบัวเชิงผนังลายกระจังตาอ้อยสีทอง-แดง)
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, 0, 512, 20);
    ctx.fillRect(0, 232, 512, 24);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, 20, 512, 5);
    ctx.fillRect(0, 226, 512, 6);

    for (let x = 8; x < 512; x += 24) {
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.moveTo(x, 18);
      ctx.lineTo(x + 8, 4);
      ctx.lineTo(x + 16, 18);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, 234);
      ctx.lineTo(x + 8, 250);
      ctx.lineTo(x + 16, 234);
      ctx.closePath();
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(3, 1);
    tex.needsUpdate = true;
    return tex;
  }

  // 3. Winter Season Royal Attire: Woven Gold Mesh & Pikul Flower Enamel Texture
  function createGoldMeshShawlTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#92400e';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 4.5;
    const step = 32;
    for (let i = -512; i < 1024; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 512, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i + 512, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }

    for (let y = 0; y <= 512; y += step / 2) {
      for (let x = 0; x <= 512; x += step / 2) {
        if (((x + y) / (step / 2)) % 2 === 0) {
          ctx.fillStyle = '#ffd700';
          ctx.beginPath();
          ctx.arc(x, y, 7.5, 0, Math.PI * 2);
          ctx.fill();

          const gemIdx = ((x * 3 + y * 7) / 16) % 3 | 0;
          ctx.fillStyle = gemIdx === 0 ? '#e11d48' : gemIdx === 1 ? '#ffffff' : '#10b981';
          ctx.beginPath();
          ctx.arc(x, y, 3.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    tex.needsUpdate = true;
    return tex;
  }

  // 4. Rainy Season Royal Attire: Embossed Gold Phum Khao Bin Monastic Robe Texture
  function createRainyGoldRobeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#d97706');
    grad.addColorStop(0.5, '#fbbf24');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 24; y < 512; y += 48) {
      ctx.fillStyle = 'rgba(120, 53, 15, 0.45)';
      ctx.fillRect(0, y - 22, 512, 4);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.65)';
      ctx.fillRect(0, y - 18, 512, 3);

      for (let x = 24; x < 512; x += 48) {
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(x, y - 16);
        ctx.quadraticCurveTo(x + 16, y, x, y + 16);
        ctx.quadraticCurveTo(x - 16, y, x, y - 16);
        ctx.fill();

        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = (x + y) % 96 === 0 ? '#e11d48' : '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.needsUpdate = true;
    return tex;
  }

  // 5. Neoclassical Royal Building with Blue Arched Windows
  function createNeoclassicalPalaceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fde68a';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, 512, 22);
    ctx.fillRect(0, 96, 512, 16);
    ctx.fillRect(0, 232, 512, 24);

    for (let x = 18; x < 500; x += 64) {
      ctx.fillStyle = '#fef9c3';
      ctx.fillRect(x - 10, 22, 10, 210);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 8, 34, 36, 48);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 8, 34, 36, 48);

      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(x + 26, 148, 18, Math.PI, 0);
      ctx.lineTo(x + 44, 228);
      ctx.lineTo(x + 8, 228);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  // 6. Heritage Shophouse / Royal Tha Chang Pavilion Facade Texture
  function createHeritageBuildingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fef08a';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 18);
    ctx.fillRect(0, 122, 512, 14);
    ctx.fillRect(0, 236, 512, 20);

    for (let x = 16; x < 500; x += 64) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x - 8, 18, 10, 218);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 8, 32, 38, 74);
      ctx.fillStyle = '#14532d';
      ctx.fillRect(x + 12, 36, 30, 66);

      ctx.strokeStyle = '#166534';
      ctx.lineWidth = 2;
      for (let ly = 40; ly < 98; ly += 6) {
        ctx.beginPath();
        ctx.moveTo(x + 14, ly);
        ctx.lineTo(x + 40, ly);
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 8, 148, 38, 88);
      ctx.fillStyle = '#0f3d23';
      ctx.fillRect(x + 12, 154, 30, 82);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  function createGreyThaiRoofTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(10, 10, 236, 236);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= 256; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
    for (let y = 0; y <= 256; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createRedGoldLotusColumnTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(0, 0, 256, 512);

    for (let y = 24; y < 500; y += 44) {
      for (let x = 24; x < 240; x += 44) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(x, y - 18);
        ctx.quadraticCurveTo(x + 16, y - 4, x, y + 16);
        ctx.quadraticCurveTo(x - 16, y - 4, x, y - 18);
        ctx.fill();

        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(x, y, 6.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + 22, y + 22, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, 460, 256, 52);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    for (let x = 0; x < 256; x += 24) {
      ctx.strokeRect(x + 2, 464, 20, 44);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  function createCofferedStarCeilingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 128) {
      for (let x = 0; x < 512; x += 128) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 6;
        ctx.strokeRect(x + 4, y + 4, 120, 120);

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x + 64, y + 64, 34, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(x + 64, y + 64, 18, 0, Math.PI * 2);
        ctx.fill();

        for (let a = 0; a < 8; a++) {
          const ang = (a * Math.PI) / 4;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(x + 64 + Math.cos(ang) * 44, y + 64 + Math.sin(ang) * 44, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 5);
    tex.needsUpdate = true;
    return tex;
  }

  function createGoldCloudWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#271712';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#fbbf24';
    for (let y = 40; y < 460; y += 64) {
      for (let x = 40; x < 480; x += 72) {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.arc(x + 10, y - 4, 9, 0, Math.PI * 2);
        ctx.arc(x - 10, y + 4, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createPantheonDiamondWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(0, 0, 256, 256);

    for (let y = 0; y < 256; y += 24) {
      for (let x = 0; x < 256; x += 24) {
        ctx.fillStyle = (x + y) % 48 === 0 ? '#93c5fd' : '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(x + 12, y);
        ctx.lineTo(x + 24, y + 12);
        ctx.lineTo(x + 12, y + 24);
        ctx.lineTo(x, y + 12);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(x + 12, y + 12, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 3);
    tex.needsUpdate = true;
    return tex;
  }

  function createGableFiligreeMaps() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#172554';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 5;
    for (let r = 24; r < 380; r += 20) {
      ctx.beginPath();
      ctx.arc(256, 360, r, Math.PI, Math.PI * 2);
      ctx.stroke();
    }

    for (let y = 20; y < 490; y += 22) {
      for (let x = 20; x < 490; x += 22) {
        ctx.fillStyle = (x + y) % 44 === 0 ? '#fde047' : '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(x, y - 9);
        ctx.quadraticCurveTo(x + 9, y, x, y + 9);
        ctx.quadraticCurveTo(x - 9, y, x, y - 9);
        ctx.fill();
      }
    }

    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(256, 285, 88, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(150, 285);
    ctx.quadraticCurveTo(256, 215, 362, 285);
    ctx.quadraticCurveTo(256, 335, 150, 285);
    ctx.fill();

    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(256, 170);
    ctx.lineTo(288, 285);
    ctx.lineTo(224, 285);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, 456, 512, 56);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, 472, 512, 18);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createGoldBlueFloralMosaicTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#d97706';
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 32) {
      for (let x = 0; x < 512; x += 32) {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 3.2;
        ctx.strokeRect(x + 2, y + 2, 28, 28);

        ctx.fillStyle = (x + y) % 64 === 0 ? '#bae6fd' : '#1e3a8a';
        ctx.beginPath();
        ctx.moveTo(x + 16, y + 3);
        ctx.lineTo(x + 29, y + 16);
        ctx.lineTo(x + 16, y + 29);
        ctx.lineTo(x + 3, y + 16);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x + 16, y + 16, 6.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x + 16, y + 16, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.needsUpdate = true;
    return tex;
  }

  function createMotherOfPearlDoorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 256, 512);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, 244, 500);

    const pearlColors = ['#e0f2fe', '#a5f3fc', '#f5d0fe', '#fef08a'];
    for (let y = 38; y < 480; y += 52) {
      for (let x = 48; x < 220; x += 78) {
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pearlColors[((x + y) / 13) % pearlColors.length | 0];
        ctx.beginPath();
        ctx.arc(x, y, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createRamakienMuralTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 0, 256);
    bgGrad.addColorStop(0.0, '#0f172a');
    bgGrad.addColorStop(0.45, '#134e4a');
    bgGrad.addColorStop(1.0, '#1c1917');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 256);

    // Top & Bottom Golden Lotus Mural Borders
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, 0, 1024, 14);
    ctx.fillRect(0, 242, 1024, 14);

    for (let panel = 0; panel < 8; panel++) {
      const px = panel * 128;

      // Golden Thai Busabok Palace in each Ramakien episode
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(px + 24, 118);
      ctx.lineTo(px + 64, 34);
      ctx.lineTo(px + 104, 118);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(px + 34, 118, 60, 72);
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(px + 50, 132, 28, 58);

      // Hanuman (white), Phra Ram (green), Thotsakan (emerald/gold), and Royal Chariots
      const figColors = ['#ffffff', '#22c55e', '#ef4444', '#fde047', '#38bdf8', '#f97316'];
      for (let f = 0; f < 7; f++) {
        ctx.fillStyle = figColors[(panel + f) % figColors.length];
        ctx.beginPath();
        ctx.arc(px + 14 + f * 16, 202 + (f % 2) * 8, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(px + 11 + f * 16, 208 + (f % 2) * 8, 6.5, 22);
      }

      // Golden Zig-Zag Sinlapa Divider between episodes
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(px, 14);
      ctx.lineTo(px + 12, 128);
      ctx.lineTo(px, 242);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(6, 1);
    tex.needsUpdate = true;
    return tex;
  }

  // High-Clarity Bangkok BMTA Bus Side Livery Texture
  function createBusSideTexture(isEuroOrange, routeNumber) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = isEuroOrange ? '#fb923c' : '#fef3c7';
    ctx.fillRect(0, 0, 512, 132);

    ctx.fillStyle = isEuroOrange ? '#ea580c' : '#b91c1c';
    ctx.fillRect(0, 132, 512, 124);

    // Metallic Blue/Silver & Gold Waist Trim Stripes
    ctx.fillStyle = isEuroOrange ? '#f8fafc' : '#1d4ed8';
    ctx.fillRect(0, 124, 512, 14);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(0, 138, 512, 5);

    for (let x = 18; x < 485; x += 52) {
      if (x === 122 || x === 330) {
        // Folding Bus Doors with Glass Panes & Yellow Handrails
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, 34, 44, 202);
        ctx.fillStyle = '#7dd3fc';
        ctx.fillRect(x + 4, 42, 16, 86);
        ctx.fillRect(x + 24, 42, 16, 86);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(x + 20, 74, 4, 118);
      } else {
        // Sliding Passenger Windows with Seated Passengers Visible Inside
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, 34, 46, 82);
        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(x + 3, 37, 40, 76);

        // Window middle horizontal bar
        ctx.fillStyle = '#475569';
        ctx.fillRect(x + 3, 74, 40, 3);

        // Seated passenger silhouette & shirt
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(x + 23, 68, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = (x % 104 === 0) ? '#ef4444' : '#0284c7';
        ctx.fillRect(x + 11, 78, 24, 34);
      }
    }

    // Crisp Route Plaque & Destination Text on Side of Bus
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(172, 152, 168, 52);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 4;
    ctx.strokeRect(172, 152, 168, 52);
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`ขสมก. สาย ${routeNumber || '1'}`, 256, 178);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(isEuroOrange ? 'ท่าราชวรดิษฐ์ - ปากน้ำ' : 'ท่าเตียน - ถนนตก', 256, 198);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createPorcelainPrangTexture(baseHex, accentHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = baseHex || '#f8fafc';
    ctx.fillRect(0, 0, 256, 256);

    const floralColors = [accentHex || '#0284c7', '#dc2626', '#f59e0b', '#2563eb', '#ec4899'];
    for (let y = 0; y < 256; y += 28) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(0, y, 256, 5);
      ctx.fillStyle = accentHex || '#0284c7';
      ctx.fillRect(0, y + 5, 256, 3);

      for (let x = 14; x < 256; x += 28) {
        const c = floralColors[((x + y) / 28) % floralColors.length | 0];
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(x, y + 16, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(x, y + 16, 3.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 4);
    tex.needsUpdate = true;
    return tex;
  }

  function createBlueCeramicWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 256, 128);

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, 0, 256, 16);
    ctx.fillRect(0, 112, 256, 16);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, 16, 256, 6);

    for (let x = 10; x < 246; x += 60) {
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(x, 26, 50, 82);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 3, 29, 44, 76);

      ctx.fillStyle = '#f59e0b';
      for (let lx = x + 13; lx < x + 44; lx += 12) {
        for (let ly = 40; ly < 96; ly += 16) {
          ctx.fillRect(lx - 3, ly - 3, 6, 6);
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 1);
    tex.needsUpdate = true;
    return tex;
  }

  function createYakshaBrocadeTexture(primaryHex, secondaryHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = primaryHex || '#b45309';
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 32) {
      ctx.fillStyle = '#fde047';
      ctx.fillRect(0, y, 512, 6);
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(0, y + 6, 512, 3);

      for (let x = 0; x < 512; x += 32) {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 3, y + 10, 26, 20);

        ctx.fillStyle = (x + y) % 64 === 0 ? '#15803d' : (secondaryHex || '#1e3a8a');
        ctx.beginPath();
        ctx.moveTo(x + 16, y + 11);
        ctx.lineTo(x + 27, y + 20);
        ctx.lineTo(x + 16, y + 29);
        ctx.lineTo(x + 5, y + 20);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x + 16, y + 20, 4.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x + 16, y + 20, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.needsUpdate = true;
    return tex;
  }

  function createInteriorEmeraldWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, 512, 256);

    for (let y = 8; y < 52; y += 20) {
      for (let x = 8; x < 512; x += 18) {
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(x, y, 12, 14);
      }
    }

    for (let y = 60; y < 250; y += 16) {
      for (let x = 0; x < 512; x += 16) {
        const gGrad = ctx.createRadialGradient(x + 8, y + 8, 1, x + 8, y + 8, 9);
        gGrad.addColorStop(0, '#4ade80');
        gGrad.addColorStop(0.6, '#10b981');
        gGrad.addColorStop(1, '#064e3b');
        ctx.fillStyle = gGrad;
        ctx.fillRect(x + 1.5, y + 1.5, 13, 13);
      }
    }

    [60, 210, 360].forEach(mx => {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(mx - 4, 88, 108, 118);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(mx, 92, 100, 110);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(mx + 50, 145, 28, 0, Math.PI * 2);
      ctx.fill();
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createMantraPlaqueTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#27170e';
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, 496, 240);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('คาถาบูชาพระแก้วมรกต', 256, 44);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '15px sans-serif';
    ctx.fillText('นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ (๓ จบ)', 256, 78);
    ctx.fillText('พุทธะ มะหามะณีรัตนะปะฏิมากะระ ปูเชมิ', 256, 108);
    ctx.fillText('ทุติยัมปิ พุทธะ มะหามะณีรัตนะปะฏิมากะระ ปูเชมิ', 256, 136);
    ctx.fillText('ตะติยัมปิ พุทธะ มะหามะณีรัตนะปะฏิมากะระ ปูเชมิ', 256, 164);
    ctx.fillStyle = '#fde047';
    ctx.fillText('เอเตนะ สัจจะวัชเชนะ มะหาเตโช เจวะ มะหาปัญโญ', 256, 198);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createDonationBoxTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 256, 256);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(12, 10, 232, 54);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 10, 232, 54);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('เชิญบริจาคบำรุงวัด', 128, 34);
    ctx.fillText('DONATION BOX', 128, 56);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(28, 80, 200, 156);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(38, 90, 180, 136);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(128, 158, 38, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function createMarbleCourtyardTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#e7e5e4';
    ctx.fillRect(0, 0, 512, 512);

    const tileSize = 32;
    for (let y = 0; y < 512; y += tileSize) {
      for (let x = 0; x < 512; x += tileSize) {
        const shade = ((x / tileSize + y / tileSize) % 2 === 0) ? '#e7e5e4' : '#d6d3d1';
        ctx.fillStyle = shade;
        ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(24, 24);
    tex.needsUpdate = true;
    return tex;
  }

  const envMap = createEnvMap();
  const roofOGMaps = createThaiRoofMaps({ mainColor: '#ea580c', midColor: '#f59e0b', borderColor: '#0f5132', innerBlue: false });
  const roofBOMaps = createThaiRoofMaps({ mainColor: '#ea580c', midColor: '#f59e0b', borderColor: '#0f5132', innerBlue: true });
  const gableTex = createGableFiligreeMaps();
  const mosaicTex = createGoldBlueFloralMosaicTexture();
  const winterShawlTex = createGoldMeshShawlTexture();
  const rainyRobeTex = createRainyGoldRobeTexture();

  const MAT = {
    gold: new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      metalness: 0.88,
      roughness: 0.16,
      envMap: envMap,
      envMapIntensity: 1.45
    }),
    brightGold: new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.94,
      roughness: 0.11,
      emissive: 0x452800,
      emissiveIntensity: 0.25,
      envMap: envMap,
      envMapIntensity: 1.75
    }),
    goldMeshShawl: new THREE.MeshStandardMaterial({
      map: winterShawlTex,
      bumpMap: winterShawlTex,
      bumpScale: 0.06,
      metalness: 0.90,
      roughness: 0.14,
      emissive: 0x3b2100,
      emissiveIntensity: 0.22,
      envMap: envMap,
      envMapIntensity: 1.7
    }),
    rainyMonasticGoldRobe: new THREE.MeshStandardMaterial({
      map: rainyRobeTex,
      bumpMap: rainyRobeTex,
      bumpScale: 0.06,
      metalness: 0.90,
      roughness: 0.15,
      emissive: 0x3b2100,
      emissiveIntensity: 0.22,
      envMap: envMap,
      envMapIntensity: 1.7
    }),
    diamondSparkle: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xe0f2fe,
      emissiveIntensity: 0.78,
      metalness: 0.95,
      roughness: 0.04,
      envMap: envMap
    }),
    antiqueBronzeGold: new THREE.MeshStandardMaterial({
      color: 0x6b4c24,
      metalness: 0.90,
      roughness: 0.16,
      emissive: 0x3b2606,
      emissiveIntensity: 0.30,
      envMap: envMap,
      envMapIntensity: 1.75
    }),
    redGoldColumn: new THREE.MeshStandardMaterial({
      map: createRedGoldLotusColumnTexture(),
      roughness: 0.24,
      metalness: 0.38,
      envMap: envMap,
      envMapIntensity: 0.95
    }),
    cofferedCeiling: new THREE.MeshStandardMaterial({
      map: createCofferedStarCeilingTexture(),
      roughness: 0.32,
      metalness: 0.42
    }),
    goldCloudWall: new THREE.MeshStandardMaterial({
      map: createGoldCloudWallTexture(),
      roughness: 0.35,
      metalness: 0.3
    }),
    pantheonWall: new THREE.MeshStandardMaterial({
      map: createPantheonDiamondWallTexture(),
      bumpMap: createPantheonDiamondWallTexture(),
      bumpScale: 0.05,
      roughness: 0.22,
      metalness: 0.48,
      envMap: envMap,
      envMapIntensity: 1.05
    }),
    ramakienMural: new THREE.MeshStandardMaterial({
      map: createRamakienMuralTexture(),
      roughness: 0.36,
      metalness: 0.18
    }),
    heritageFacade: new THREE.MeshStandardMaterial({
      map: createHeritageBuildingTexture(),
      roughness: 0.42,
      metalness: 0.08
    }),
    neoclassicalPalace: new THREE.MeshStandardMaterial({
      map: createNeoclassicalPalaceTexture(),
      roughness: 0.38,
      metalness: 0.10
    }),
    busCreamRed: new THREE.MeshStandardMaterial({
      map: createBusSideTexture(false, '1'),
      roughness: 0.26,
      metalness: 0.30
    }),
    busEuroOrange: new THREE.MeshStandardMaterial({
      map: createBusSideTexture(true, '508'),
      roughness: 0.24,
      metalness: 0.34
    }),
    brassRailing: new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.22,
      envMap: envMap
    }),
    gableGold: new THREE.MeshStandardMaterial({
      map: gableTex,
      bumpMap: gableTex,
      bumpScale: 0.09,
      metalness: 0.82,
      roughness: 0.19,
      envMap: envMap,
      envMapIntensity: 1.4
    }),
    whiteStucco: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.42,
      metalness: 0.04,
      envMap: envMap,
      envMapIntensity: 0.4
    }),
    palaceCream: new THREE.MeshStandardMaterial({
      color: 0xfef9c3,
      roughness: 0.48,
      metalness: 0.05
    }),
    ministryYellow: new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.52,
      metalness: 0.05
    }),
    blueCeramicWall: new THREE.MeshStandardMaterial({
      map: createBlueCeramicWallTexture(),
      roughness: 0.28,
      metalness: 0.20,
      envMap: envMap,
      envMapIntensity: 0.65
    }),
    whitePorcelain: new THREE.MeshStandardMaterial({
      map: createPorcelainPrangTexture('#ffffff', '#0284c7'),
      roughness: 0.22,
      metalness: 0.24,
      envMap: envMap,
      envMapIntensity: 0.82
    }),
    creamWall: new THREE.MeshStandardMaterial({
      map: createCreamGoldStuccoWallTexture(),
      roughness: 0.44,
      metalness: 0.10
    }),
    marbleFloor: new THREE.MeshStandardMaterial({
      map: createMarbleCourtyardTexture(),
      roughness: 0.34,
      metalness: 0.12,
      envMap: envMap,
      envMapIntensity: 0.45
    }),
    roofOrangeGreen: new THREE.MeshStandardMaterial({
      map: roofOGMaps.map,
      bumpMap: roofOGMaps.bumpMap,
      bumpScale: 0.11,
      roughness: 0.20,
      metalness: 0.25,
      envMap: envMap,
      envMapIntensity: 0.76
    }),
    roofBlueOrange: new THREE.MeshStandardMaterial({
      map: roofBOMaps.map,
      bumpMap: roofBOMaps.bumpMap,
      bumpScale: 0.11,
      roughness: 0.19,
      metalness: 0.28,
      envMap: envMap,
      envMapIntensity: 0.88
    }),
    roofGreyThai: new THREE.MeshStandardMaterial({
      map: createGreyThaiRoofTexture(),
      roughness: 0.38,
      metalness: 0.15
    }),
    emeraldMosaic: new THREE.MeshStandardMaterial({
      map: mosaicTex,
      bumpMap: mosaicTex,
      bumpScale: 0.07,
      metalness: 0.76,
      roughness: 0.17,
      envMap: envMap,
      envMapIntensity: 1.35
    }),
    royalBlueGlass: new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.65,
      roughness: 0.18,
      envMap: envMap,
      envMapIntensity: 1.1
    }),
    rubyGem: new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0x881337,
      emissiveIntensity: 0.48,
      roughness: 0.08,
      metalness: 0.35
    }),
    sapphireEnamel: new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.35,
      roughness: 0.12,
      metalness: 0.55,
      envMap: envMap
    }),
    pearlCanopy: new THREE.MeshStandardMaterial({
      color: 0xfefce8,
      emissive: 0xfef08a,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.3
    }),
    interiorEmeraldWall: new THREE.MeshStandardMaterial({
      map: createInteriorEmeraldWallTexture(),
      emissive: 0x059669,
      emissiveIntensity: 0.38,
      roughness: 0.2,
      metalness: 0.3
    }),
    teakWoodColumn: new THREE.MeshStandardMaterial({
      color: 0x6b2714,
      roughness: 0.34,
      metalness: 0.15,
      envMap: envMap,
      envMapIntensity: 0.55
    }),
    mantraPlaque: new THREE.MeshStandardMaterial({
      map: createMantraPlaqueTexture(),
      roughness: 0.35,
      metalness: 0.2
    }),
    donationBox: new THREE.MeshStandardMaterial({
      map: createDonationBoxTexture(),
      roughness: 0.35,
      metalness: 0.15
    }),
    emeraldJade: new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x065f46,
      emissiveIntensity: 0.44,
      roughness: 0.04,
      metalness: 0.26,
      envMap: envMap,
      envMapIntensity: 1.85
    }),
    darkJadeRock: new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.20,
      metalness: 0.22,
      envMap: envMap
    }),
    crystalGlow: new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.5
    }),
    pearlDoor: new THREE.MeshStandardMaterial({
      map: createMotherOfPearlDoorTexture(),
      metalness: 0.68,
      roughness: 0.18,
      envMap: envMap,
      envMapIntensity: 1.2
    }),
    redDoor: new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.40,
      metalness: 0.12
    }),
    redCarpet: new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.85,
      metalness: 0.05
    }),
    lampGreen: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.65,
      roughness: 0.28
    }),
    bronzeDark: new THREE.MeshStandardMaterial({
      color: 0x292524,
      metalness: 0.75,
      roughness: 0.32,
      envMap: envMap
    }),
    chineseStone: new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.65,
      metalness: 0.1
    }),
    pinkElephant: new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.4,
      metalness: 0.1
    }),
    riverWater: new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.18,
      metalness: 0.45,
      envMap: envMap,
      envMapIntensity: 0.9
    }),
    lawnGrass: new THREE.MeshStandardMaterial({
      color: 0x3f7d20,
      roughness: 0.85
    }),
    manicuredHedge: new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.78
    }),
    treeFoliage: new THREE.MeshStandardMaterial({
      color: 0x2b7a2b,
      roughness: 0.72
    }),
    trunk: new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.9
    }),
    asphaltRoad: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.82
    }),
    sidewalk: new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.68
    })
  };

  const allMaterials = Object.values(MAT);

  return {
    envMap,
    MAT,
    allMaterials,
    createPorcelainPrangTexture,
    createYakshaBrocadeTexture
  };
})();
