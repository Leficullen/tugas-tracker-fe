export default function Home() {
  return (
    <div className="lg:p-6">
      <h1 className="text-h1 text-primary font-bold">Dashboard</h1>
      <p className="text-p">
        Welcome back! The following is a summary of your assignments and
        courses.
      </p>

      <div className="mt-4 space-x-4">
        <a href="/matkul" className="bg-blue-500 text-white px-4 py-2 rounded">
          Kelola Mata Kuliah
        </a>

        <a href="/tugas" className="bg-green-500 text-white px-4 py-2 rounded">
          Kelola Tugas
        </a>
      </div>
    </div>
  );
}
