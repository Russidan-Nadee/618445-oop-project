import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import EmailGate from '@/components/features/auth/EmailGate'; // นำเข้า EmailGate
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* EmailGate จะควบคุมการแสดงผลทั้งหมด ถ้าไม่ผ่าน จะเห็นแค่หน้า Login */}
        <EmailGate>
          <div className="flex h-screen overflow-hidden">
            {/* ส่วน Sidebar */}
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
              {/* ส่วน Header ด้านบน */}
              <Header />

              {/* ส่วนเนื้อหาที่จะเปลี่ยนไปตาม Route */}
              <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                {children}
              </main>
            </div>
          </div>
        </EmailGate>
      </body>
    </html>
  );
}