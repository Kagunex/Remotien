# Visual Art Direction (9:16 Vertical Documentary)

## Gaya Utama
- **High-Quality Stylized Realistic 3D Motion Design**: Material metal, kaca reflektif, plastik matte/glossy, PCB tembaga, dan elemen emisif.
- **Format**: 1080 × 1920 (9:16 Portrait) @ 30 FPS dengan tata letak vertikal bertingkat agar objek utama tidak terpotong di sisi kiri/kanan.
- **Pencahayaan**: Key light atas-kiri (`[-5.5, 9.5, 7.5]`), rim light sejuk (`[6.5, 5.5, -6]`), fill bawah (`[2.5, -2.2, 4.5]`), dan shadow map 1024px optimal untuk CI/GitHub Actions.
- **WebGL Resilience**: Terpusat di `src/components/SceneCanvas.tsx` dengan `preserveDrawingBuffer: true`, `failIfMajorPerformanceCaveat: false`, dan `--use-angle=swiftshader` pada workflow.
