import { useEffect, useState } from 'react';
// import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {selectloggedInAgency,updateAgencyAsync , updateAgencyDelResAsync,getLoggedInAgencyAsync} from "../../Auth/authSlice";
import { Link } from 'react-router-dom';
import {
  PencilIcon,
  ScissorsIcon,
  TrashIcon,
  EyeIcon,
  BeakerIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
// import Pagination from '../../common/Pagination';

function Resource() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  // const resources = loggedAgency.resources;
//   const totalOrders = useSelector(selectTotalOrders);
  const [editableResourceId, setEditableResourceId] = useState(-1);
  const [isClosed, setIsClosed] = useState(true);
  const [sort, setSort] = useState({});

  const handleEdit = (resource) => {
    setEditableResourceId(resource.id);
  };

  const handleAdd = () => {
    console.log('Add');
  };

  const handleUpdate = (e, resource) => {
    // const updatedOrder = { ...order, status: e.target.value };
    // dispatch(updateOrderAsync(updatedOrder));
    // setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case 'aavailable':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'Available':
        return 'bg-green-200 text-green-600';
      case 'Not Available':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
     
  useEffect(()=>{
    dispatch(getLoggedInAgencyAsync());
},[dispatch]);

const loggedAgency = useSelector(selectloggedInAgency);
// console.log(loggedAgency);

const handleDelete = (resource) => {
  console.log('Delete',resource._id);
  
  dispatch(updateAgencyDelResAsync({id:loggedAgency._id,resId:resource._id}));
};
//   useEffect(() => {
//     // const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
//     dispatch(fetchAllOrdersAsync({ sort, page }));
//   }, [dispatch, page, sort]);

  return (
   <>
    {isClosed && <div  className="mx-auto max-w-7xl pt-12 sm:px-6 lg:px-8">
    <Link onClick={()=>setIsClosed(false)}
      className="no-underline rounded-md mx-10 my-5 bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add New
    </Link>
  </div>}
    {!isClosed && <div  className="mx-auto max-w-7xl pt-12 sm:px-6 lg:px-8">
    <Link onClick={()=>setIsClosed(true)}
      className="no-underline rounded-md mx-10 my-5 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
     Close
    </Link>
  </div>}
  {/*Add resource form */} 
  {!isClosed && <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              // console.log(data,loggedAgency._id);
                dispatch(updateAgencyAsync({id:loggedAgency._id,resource:{...data}}));
                reset();
            })}
            className="space-y-6"
            // action="#"
            // method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
              Name
              </label>
              <div className="mt-2 ">
                <input
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  type="string"
                  className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
              Type
              </label>
              <div className="mt-2 ">
                <input
                  id="type"
                  {...register('type', {
                    required: 'Type is required',
                  })}
                  type="string"
                  className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
              Quantity
              </label>
              <div className="mt-2 ">
                <input
                  id="quantity"
                  {...register('quantity', {
                    required: 'Quantity is required',
                  })}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
              Location
              </label>
              <div className="mt-2 ">
                <input
                  id="location"
                  {...register('location', {
                    required: 'Location is required',
                  })}
                  type="string"
                  className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>}

      {/* Resource table */}
  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div className="overflow-x-auto">
       
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                  >
                    Name {' '}
                  </th>
                  <th className="py-3 px-6 text-center">Type</th>
                  <th
                    className="py-3 px-6 text-center cursor-pointer"
                    onClick={(e) =>
                        handleSort({
                          sort: 'quantity',
                          order: sort?._order === 'asc' ? 'desc' : 'asc',
                        })
                      }
                  >
                    Total Amount {' '}
                    {sort._sort === 'quantity' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center">Location</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {loggedAgency && loggedAgency.resources.map((resource) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{resource.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                        {resource.type}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {resource.quantity}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {resource.location}
                      </div>
                    </td>
                    {/* <td className="py-3 px-6 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div>
                    </td> */}
                    <td className="py-3 px-6 text-center">
                      {resource.id === editableResourceId ? (
                        <select onChange={(e) => handleUpdate(e, resource)}>
                          <option value="Available">Available</option>
                          <option value="Not Available">Not Available</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            resource.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {resource.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(resource)}
                          ></PencilIcon>
                        </div>
                        <div className="w-6 mr-4 transform hover:text-red-400 hover:scale-120">
                          <TrashIcon
                            className="w-8 h-8"
                            onClick={(e) => handleDelete(resource)}
                          ></TrashIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination> */}
    </div>
    </div>
    </>
  );
}

export default Resource;