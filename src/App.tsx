import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"

const App = () => {
  return (
    <main className='h-screen flex'>
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SigninForm />}/>
                <Route path='/sign-up' element={<SignupForm />}/>
            </Route>

            {/* private route */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />}/> {/*index means the starting page*/}
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/update-post/:id" element={<EditPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/profile/:id/*" element={<Profile />} /> {/* '*' means everything after that profile will also be pointing to that profile */}
                <Route path="/update-profile/:id" element={<UpdateProfile />} />
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App