
export default function ProfileUpload() {
  return (
    <div className="justify-around bg-white rounded-lg shadow-sm border p-6 flex items-center space-x-4 w-full max-w-2xl">
      <div className="flex gap-2 items-center">
        <div className="w-14 h-14 rounded-full bg-red-500"></div>
        <div className="flex flex-col">
          <span className="font-medium">Pietro dos Santos Menezes</span>
          <span className="text-sm text-gray-500">PNG ou JPG com no máximo 1000px de largura e altura.</span>
        </div>
      </div>
      <button className="text-sm font-medium rounded-lg px-3 -mr-6">
        <i className="bi bi-upload w-5 h-5 mr-2"></i>
        Upload
      </button>
    </div>
  );
}
