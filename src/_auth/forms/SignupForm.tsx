import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();


  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Submit Handler
 const onSubmit = async (values: z.infer<typeof SignupValidation>) => {

      const newUser = await createUserAccount(values);
      console.log("User created:", newUser);

      if(!newUser){
        return toast("Sign up failed. Please try again.");
      }
      
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      })

      if(!session){
        return toast("Sign in failed. Please try again")
      }

      const isLoggedIn = await checkAuthUser();

      if(isLoggedIn){
        form.reset();

        navigate('/')
      } else{
        return toast("Sign up failed. Please try again");
      }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10">
      <Form {...form}>
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <img
            src="/assets/images/logo4.svg"
            alt="logo"
            className="w-36 mt-6"
          />

          <h2 className="sm:text-xl md:text-2xl font-bold pt-2 text-center">
            Create a new account
          </h2>
          <p className="base-regular text-light-3 text-center">
            To use Postgram, please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="sm:max-w-sm md:max-w-md w-full flex flex-col gap-5 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isCreatingAccount || isSigningInUser || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader />
                </div>
              ) : (
                "Sign up"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center my-2">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </section>
  );
};

export default SignupForm;
