const Layout = ({ children }: {children: React.ReactNode}) => {
    return (
        <main className="flex justify-center items-center min-h-screen w-full 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {children}
        </main>
    )
}

export default Layout