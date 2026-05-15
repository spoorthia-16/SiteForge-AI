import { PrismaClient } from './generated/prisma/index.js';
const prisma = new PrismaClient();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NovaFlow - Productivity Workspace</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .bg-gradient-radial {
            background: radial-gradient(circle at center, rgba(134,239,172,0.15) 0%, rgba(147,197,253,0.15) 40%, rgba(255,255,255,0) 70%);
        }
    </style>
</head>
<body class="bg-white text-gray-900 min-h-screen relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-gradient-radial blur-3xl rounded-full -z-10 pointer-events-none"></div>

    <!-- Navigation -->
    <nav class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-[#00d0f0] rounded-xl shadow-sm"></div>
            <span class="text-xl font-bold tracking-tight text-gray-900">NovaFlow</span>
        </div>
        
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" class="hover:text-gray-900 transition-colors">Features</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Demo</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Testimonials</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Pre-launch</a>
        </div>

        <button class="bg-[#2dd4bf] hover:bg-[#14b8a6] text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download Now
        </button>
    </nav>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 relative z-10">
            <h1 class="text-5xl md:text-[3.5rem] font-[800] leading-[1.1] text-gray-900 tracking-tight">
                Launch Your<br/>
                Productivity<br/>
                with NovaFlow
            </h1>
            
            <p class="text-[1.1rem] text-gray-500 max-w-md leading-relaxed">
                All-in-one workspace designed to simplify, organize, and accelerate your day. Intuitive, fast, and built for teams.
            </p>
            
            <div class="flex items-center gap-4">
                <button class="bg-[#0ea5e9] hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2">
                    Download Now
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button class="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                    Learn More
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>

            <div class="flex items-center gap-6 pt-2">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
                    <span class="text-sm font-medium text-gray-500">Trusted by 10k+ teams</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-[#2dd4bf] rounded-full"></div>
                    <span class="text-sm font-medium text-gray-500">4.9/5 rating</span>
                </div>
            </div>
        </div>

        <div class="relative flex justify-end items-center mt-8 md:mt-0 pt-4">
            <div class="relative w-full max-w-[500px]">
                <!-- Main Image Card -->
                <div class="bg-[#e2e8f0] rounded-3xl w-full aspect-[3/2] flex items-center justify-center relative z-10 shadow-sm border border-gray-100/50 backdrop-blur-sm bg-white/40">
                    <span class="text-gray-400/80 font-medium text-5xl tracking-wide">600 &times; 400</span>
                </div>
                <!-- Decorative Blue Circle -->
                <div class="absolute -bottom-6 -right-6 w-[100px] h-[100px] bg-[#60a5fa] rounded-full z-20"></div>
            </div>
        </div>
    </main>
</body>
</html>`;

async function updateLatestProject() {
  const project = await prisma.websiteProject.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  if (project) {
    await prisma.websiteProject.update({
      where: { id: project.id },
      data: { current_code: html }
    });
    console.log('Updated project:', project.id);
  } else {
    console.log('No project found');
  }
}

updateLatestProject().catch(console.error).finally(() => prisma.$disconnect());
