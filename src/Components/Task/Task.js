
import { GoBell } from "react-icons/go";
import { GoQuestion } from "react-icons/go";
import { AiFillFolder } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { SlPaperPlane } from "react-icons/sl";
import { useState } from "react";
import { useEffect } from "react";
import { loadUser } from "../Hooks/api";
import { BiCircle } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import images from '../Images/Img.png'

import { Table } from 'antd';


export default function Taskcomponents() {
    const [postdata, setPostdata] = useState([])
    const [tempUsers, setTempUsers] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');


    const array = tempUsers.map(item => item.userId);

    let arr = ["All"];
    let set = new Set(array);
    for (let duplicates of set) {
        arr.push(duplicates)
    }

    function filterUsers(event) {
        let value = event.target.value;
        if (value === "All") {
            setPostdata(tempUsers)
        } else {

            setPostdata((prevUsers) => {
                return tempUsers.filter((user) => user.userId.toString().includes(value));
            })
        }
    }



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };


    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            render: (id) => <a>{id}</a>,
        },
        {
            title: 'userId',
            dataIndex: 'userId',
        },
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'body',
            dataIndex: 'body',
        },
    ];

    useEffect(() => {
        loadUser(setPostdata, setTempUsers)
    }, []);
    function filtervalues(event) {
        let value = event.target.value;
        setPostdata((prevUsers) => {
            return tempUsers.filter((user) => JSON.stringify(user).includes(value));
        });
    }

    return (
        <div>
            <div className="d-flex border-style shadow">
                <div className="sidebar-style">
                    <h1><SlPaperPlane /></h1>
                    <h2><AiFillFolder /></h2>
                    <h2><BsFillGearFill /></h2>

                </div>
                <div className="main-body">
                    <div className=" header-style d-flex shadow">
                        <div className="d-flex flex-wrap flex-row">
                            <h4 className="ms-2"><b>Projects</b></h4>
                            <span className="ms-2 mt-1">
                                <b className="btn btn-outline-secondary rounded ">

                                    {

                                        !postdata ? <div>
                                        </div> : postdata.length
                                    }
                                </b>
                            </span>
                        </div>
                        <div className="float-end icon-style">
                            <span><GoBell /></span>
                            <span className="ms-2"><GoQuestion /></span>
                            <span className="ms-2">
                                <img src={images} alt="image" style={{ width: '35px', height: '35px', }} className="rounded-circle" />
                            </span>
                        </div>
                    </div>
                    <div className="table-width mt-4 ">
                        <div className="align-style d-flex">
                            <div className="d-flex">
                                <div className="ms-1 ">
                                    <input type="date" className="form-control" />
                                </div>

                                <div className="ms-3 ">
                                    <select className="form-control" onChange={filterUsers}>

                                        {
                                            arr.map(userId => {
                                                return (
                                                    <>
                                                        <option>{userId}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <input type="search" className="form-control" placeholder="Search" onChange={filtervalues} />
                                </div>
                            </div>
                            <div className="float-end">
                                <button className="btn btn-primary"><BiPlus />New projects</button>
                            </div>
                        </div>
                        <div className="d-flex mt-4 ms-2">
                            <span className="hover-shadow styles-hover">All
                                 <span  className=" rounded-circle border ms-1">
                                {

                                    !postdata ? <div>
                                    </div> : postdata.length
                                }
                                </span>


                               </span>
                            <span className="ms-4 hover-shadow">Risk <BiCircle className="font-width" />
                            </span>
                            <span className="ms-4 hover-shadow">On hold <BiCircle className="font-width" /></span>
                            <span className="ms-4 hover-shadow">Potential Risk <BiCircle className="font-width" /></span>
                            <span className="ms-4 hover-shadow">On track <BiCircle className="font-width" /></span>
                            <span className="ms-4 hover-shadow">Archived <BiCircle className="font-width" /></span>
                        </div>

                        <div style={{ height: 400, width: '100%' }} className="main-content mt-4">
                            <Table
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }}

                                columns={columns}
                                dataSource={postdata}
                                className="table-hover"
                            />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}