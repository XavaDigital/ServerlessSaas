import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { storage } from 'config/firebase';

import BreadCrumbs from 'components/BreadCrumbs';
import Layout from 'components/dashboard/Layout';
import { useRequireAuth } from 'hooks/useRequireAuth';
import Button from 'components/elements/Button';

const breadCrumbs = {
  back: {
    path: '/profile',
    text: 'Back',
  },
  first: {
    path: '/profile',
    text: 'Profile',
  },
  second: {
    path: '/profile/edit',
    text: 'Edit',
  },
};

const EditProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      console.log(rejectedFiles);
    }
    const file = acceptedFiles[0];
    if (file.type.includes('image')) {
      handleUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const router = useRouter();
  const auth = useRequireAuth();

  if (!auth.user) return null;

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      name: auth.user.name,
    },
  });

  const handleUpload = (image) => {
    const uploadTask = storage.ref(`avatars/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref(`avatars`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setAvatarUrl(url);
          });
      }
    );
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    setError(null);

    const user = { ...data };
    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }

    auth
      .updateUser({ id: auth.user.uid, user })
      .then((response: { error?: { massage: string } }) => {
        setIsLoading(false);
        response?.error ? setError(response.error) : router.push('/profile');
      });
  };

  return (
    <Layout>
      <div className="container py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-4 sm:py-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                Account information
              </h2>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <span className="shadow rounded-md">
                <Button title="Delete account" />
              </span>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto bg-white overflow-hidden shadow rounded-lg px-5 py-6 sm:px-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error?.message && (
              <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
                <span>{error.message}</span>
              </div>
            )}
            <div>
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit profile
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Update your profile information
                  </p>
                </div>
                <div className="mt-6 sm:mt-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-xs rounded-md shadow-sm">
                        <input
                          id="name"
                          name="name"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          ref={register({
                            required: 'Please enter a username',
                          })}
                        />
                        {errors.name && (
                          <div className="mt-2 text-xs text-red-600">
                            {errors.name.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Email address
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-xs rounded-md shadow-sm">
                        <input
                          id="email"
                          type="email"
                          disabled
                          value={auth.user.email}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="photo"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Photo
                    </label>
                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          {avatarUrl || auth.user.avatarUrl ? (
                            <span className="inline-block relative">
                              <img
                                className="h-12 w-12 object-cover rounded-md"
                                src={avatarUrl || auth.user.avatarUrl}
                                alt={auth.user.name}
                              />
                            </span>
                          ) : (
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )}
                        </span>
                        <div>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <span className="ml-5 rounded-md shadow-sm">
                                <button
                                  type="button"
                                  className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                                >
                                  Drop here
                                </button>
                              </span>
                            ) : progress && progress !== 100 ? (
                              <div className="shadow ml-3 rounded-md bg-grey-light max-w-sm m-w-64">
                                <div
                                  className="rounded-md bg-royal-blue-600 text-xs leading-none py-1 text-center text-white"
                                  style={{ width: `${progress}%` }}
                                >
                                  {`${progress}%`}
                                </div>
                              </div>
                            ) : (
                              <span className="ml-5 rounded-md shadow-sm">
                                <button
                                  type="button"
                                  className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                                >
                                  Change
                                </button>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end">
                <span className="inline-flex rounded-md shadow-sm">
                  <Link href="/profile">
                    <button
                      type="button"
                      className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      Cancel
                    </button>
                  </Link>
                </span>
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700 transition duration-150 ease-in-out"
                  >
                    {isLoading ? 'Loading...' : 'Save'}
                  </button>
                </span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default EditProfile;
