export default function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>My Profile Data</h1>
      <h2 className="p-3 bg-purple-500 roundedtex">{params.id}</h2>
    </div>
  );
}
