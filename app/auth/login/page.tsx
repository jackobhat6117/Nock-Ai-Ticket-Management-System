"use client";
import MainHeader from "@/components/ui/mainHeader";
import React, { useState } from "react";
import { Form, Input, Button, Spinner } from "@nextui-org/react";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@/components/ui/svgs/svgHandler";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastHandler } from "@/components/common/toast";


const Page = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      
    });
    console.log('resutl', result)

    if (result?.error) {
      ToastHandler({ status: "error", message: "Error in Authentication" });
    } else {
      
      ToastHandler({ status: "success", message: "Authentication Successful" });
      router.push("/dashboard/noc-it")
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <MainHeader textValue="Home" />
      <div>
        <div>
          <div className="flex justify-center sm:px-48 mt-16 sm:mt-15">
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:mb-2">
              <div className="px-4 sm:p-0">
                <img
                  src="/assets/ai-gear.jpg"
                  className="sm:h-[600px] sm:w-[600px] h-full rounded-md bg-gradient-to-r from-black to-white"
                  alt="Login picture"
                />
              </div>
              <div className="bg-white sm:-ml-24 -mt-12 sm:mt-0 m-4 sm:m-0 sm:rounded-l-3xl p-4 shadow-xl border">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center sm:mt-7">
                    <h4 className="sm:text-3xl text-center">
                      Welcome to Noc AI Incident Management
                    </h4>
                  </div>
                  <div className="flex justify-center sm:mt-4">
                    <h5 className="sm:text-2xl text-primary">
                      Login to your account
                    </h5>
                  </div>
                  <Form
                    className="w-full flex flex-col space-y-10 justify-center mt-20 items-center"
                    validationBehavior="native"
                    // onReset={() => setAction("reset")}
                    onSubmit={onSubmit}
                  >
                    <Input
                      isRequired
                      errorMessage="Please enter a valid email"
                      label="Email"
                      labelPlacement="outside"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      className="max-w-md"
                    />
                    <Input
                      isRequired
                      errorMessage="Please enter the password"
                      label="Password"
                      labelPlacement="outside"
                      className="max-w-md"
                      name="password"
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                    />
                   <div className="w-full flex items-center justify-center">
                        <Button
                          color="success"
                          type="submit"
                          className="text-white text-lg w-96 flex items-center justify-center"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center gap-4">
                              <p>Please wait</p>
                              <Spinner size="sm" color="default"/>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </div>

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
