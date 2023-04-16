import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AddProduct } from "../Redux/slice/SingleSlice";
import Footer from "./Footer";
import Product from "../Product";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  // const { fulldata } = useSelector((util) => util.singleProduct);

  const { mutateAsync } = useMutation((value) => axios.get(value.url));
  const {
    isLoading,
    error,
    data: fulldata,
  } = useQuery({
    queryKey: ["SingleProductdata", id],
    queryFn: () =>
      axios.get(`/api/v1/nfts/${id}`).then((res) => {
        mutateAsync({
          url: `/api/v1/nfts/recommendation/product?categories=${res?.data?.data?.categories}&&id=${res?.data?.data?._id}`,
        }).then((res) => {
          if (res?.data) {
            dispatch(AddProduct(res?.data?.data));
          }
        });
        return res?.data?.data;
      }),
  });

  return (
    <div className=" w-screen h-screen overflow-y-scroll">
      <Nav />
      {!isLoading ? (
        <SinglePageDetail fulldata={fulldata} />
      ) : (
        <h1 className=" text-lg">Loading plase wait .....</h1>
      )}
      <hr />
      <SimilarProducts />
      <hr />
      <Footer />
    </div>
  );
};

export default SinglePage;

const SinglePageDetail = ({ fulldata }) => {
  const [imageCover, setCoverimage] = useState(fulldata?.imageCover);
  const dispatch = useDispatch();
  useEffect(() => {
    setCoverimage(fulldata?.imageCover);
  }, [fulldata]);
  return (
    <>
      <div className=" h-[100%] flex">
        <div className="h-[80%] w-[60%] flex flex-col justify-around items-center p-4">
          <div className=" w-[100%] h-[70%]  flex mt-4 justify-center items-center max-h-70">
            <img
              src={
                `${process.env.REACT_APP_BASE_URL}/${imageCover}` ||
                "../pic5.jpg"
              }
              alt="prductimage"
              className="w-[100%] h-[100%]"
            />
          </div>
          <div className=" w-[100%] h-24 grid grid-cols-5 grid-flow-row-5 gap-2 mt-4  overflow-hidden">
            {fulldata?.images?.map((image, index) => (
              <div key={index}>
                <div
                  className="flex justify-center hover:bg-[rgba(185,142,62,0.04)] hover:shadow-sm"
                  onClick={() => {
                    setCoverimage(image);
                  }}
                >
                  <img
                    src={
                      `${process.env.REACT_APP_BASE_URL}/${image}` ||
                      "../noimage.jpg"
                    }
                    alt="prductimage"
                    className="w-20 flex-1 m-2 cursor-pointer "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[100%] w-[60%] px-3">
          <hr className="mt-10 bg-red-900 text-red-600 " />
          <h4 className=" text-[#007185]">
            . santosh product and supplyers pvt.ltd
          </h4>
          <h2 className=" max-h-28 overflow-y-scroll text-base scrollbar mt-2">
            {fulldata?.name}
          </h2>
          <hr className=" border-gray-300 mt-3" />
          <div className="mt-2 flex ">
            {[...Array(parseInt(fulldata?.ratingsAverage))].map((_, index) => (
              <React.Fragment key={index}>⭐</React.Fragment>
            ))}
            <h4 className="px-2 text-[#007185]">
              {fulldata?.ratingsAverage} Star
            </h4>
          </div>
          <br />
          <div>
            <strong>$ {fulldata?.price}</strong>
            <span className=" float-right">
              <span>Availability: </span>
              <span className=" text-[#007185]">In Stock</span>
            </span>
            <br />
            <br />
            <a href="#" className="float-right cursor-pointer">
              click to check available discount coupen
            </a>
          </div>
          <br />
          <br />
          <div className="flex w-[100%] justify-between items-center ">
            <button
              className="p-3 bg-[#f0c14b] rounded-md border-bro flex justify-between items-center"
              onClick={() => {
                dispatch({
                  type: "ADD_TO_BASKET",
                  item: {
                    id: fulldata._id,
                    price: fulldata.price,
                    title: fulldata.name,
                    image: fulldata.imageCover,
                    rating: fulldata.rating,
                  },
                });
              }}
            >
              <AddShoppingCartIcon />
              Add To Cart
            </button>
            <button className="p-3 bg-[#f0c14b] rounded-md flex justify-between items-center">
              <ElectricBoltOutlinedIcon />
              Bye now
            </button>
          </div>
          <hr className="mt-3 border-gray-300" />
          <div className="mt-3">
            <h1>about this products</h1>
            <br />
            <p className=" max-h-60 overflow-y-scroll">
              {fulldata?.description}
            </p>
          </div>
        </div>
        <div className="h-[100%] w-[60%] flex justify-center ">
          <div className=" mt-10 h-[50%] w-[80%] p-3 flex flex-col  outer_boder">
            <hr />
            <div className="mt-3 mb-3">
              <h4>Return and Refund</h4>
              <span>
                <ReplyOutlinedIcon className="mr-2" />
                Refer to Return and Refund Policy
              </span>
            </div>
            <hr></hr>
            <div className="mt-3 mb-3">
              <h4>warranty</h4>
              <span>
                <GppGoodOutlinedIcon />
                No warrenty
              </span>
            </div>
            <hr />
            <div className="mt-3 mb-3">
              <span>
                {" "}
                Sold By{" "}
                <span className="text-[#007185]">
                  santosh product and supplyers pvt.LTD
                </span>
              </span>
              <br />
              <span>Shipping from: Kathmandu</span>
              <br />
              <span>Fullfilled by cart-zone.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SimilarProducts = () => {
  const { id } = useParams();
  const { fulldata } = useSelector((util) => util.singleProduct);
  if (fulldata.length) {
    const data_without_Current_Id = fulldata.filter((item) => item._id !== id);
    return (
      <div className="px-4 py-1 mb-3">
        <div className="py-5">Recommended products for you</div>
        <div className=" min-h-[15rem]  flex justify-center items-center bg-[#8686860f] p-3">
          <div className="w-[100%] min-h-[12rem] grid grid-cols-5 grid-flow-row-5 gap-3">
            {data_without_Current_Id.length ? (
              <>
                {data_without_Current_Id?.map((items, index) => (
                  <React.Fragment key={index}>
                    <Product
                      id={items._id}
                      price={items.price}
                      title={items.name}
                      image={items.imageCover || `noimage.jpg`}
                      rating={items.rating}
                    />
                  </React.Fragment>
                ))}
              </>
            ) : (
              <div className="flex justify-center items-center w-[100rem]">
                <span>
                  <SyncProblemIcon />
                  <span className="ml-5">No products for Recommendation</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-4 py-1 mb-3">
        <div className="py-5">Recommended products for you</div>
        <div className=" min-h-[15rem] flex justify-center items-center bg-[#8686860f] rounded-md">
          <span>wait... until product found </span>
        </div>
      </div>
    );
  }
};
