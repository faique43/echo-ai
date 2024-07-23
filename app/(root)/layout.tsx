export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <p className="text-white-1">Left Bar</p>
        {children}
        <p className="text-white-1">Right Bar</p>
      </main>
    </div>
  );
}
