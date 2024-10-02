const AdminLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden max-w-full'>
      <main className='flex flex-grow mt-14 bg-slate-200 justify-center'>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
