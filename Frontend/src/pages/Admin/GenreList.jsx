import { useState } from "react";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenreQuery,
  useGetGenreQuery,
  useUpdateGenreMutation,
} from "../../redux/api/genre.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm.jsx";
import Modal from "../../components/Modal.jsx";

const GenreList = () => {
  const { data: genres, refetch: refresh } = useGetAllGenreQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenreApi] = useCreateGenreMutation();
  const [updateGenreApi] = useUpdateGenreMutation();
  const [deleteGenreApi] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenreApi({ name }).unwrap();
      console.log(result);
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is added successfully`);
        refresh();
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.error(error);
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Required new Name field");
      return;
    }

    try {
      const updatedGenre = await updateGenreApi({
        id: selectedGenre._id,
        data: { name: updatingName },
      }).unwrap();
      console.log(updatedGenre);
      if (updatedGenre.error) {
        toast.error(`${updatedGenre.error}`);
      } else {
        toast.success(`${updatedGenre.name} is updated successfully`);
        refresh();
        setModalVisible(false);
        setSelectedGenre(null);
        setUpdatingName("");
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.error(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();

    try {
      console.log(selectedGenre);
      const deletedGenre = await deleteGenreApi(selectedGenre._id).unwrap();
      // toast.success("Deleted genre Successfully");
      // refresh();
      // setModalVisible(false);
      // setSelectedGenre(null);

      console.log(deletedGenre);

      if (deletedGenre.error) {
        toast.error(deletedGenre.error);
      } else {
        toast.success(`${deletedGenre.name} is deleted successfully`);
        refresh();
        setModalVisible(false);
        setSelectedGenre(null);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.error(error);
    }
  };
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12 font-bold text-3xl underline decoration-solid">
          Manage Genres
        </h1>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                    // console.log(selectedGenre);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
