import React, {useState, useRef, useEffect} from 'react';
import { Dropdown, Row, Nav, Tab } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

import PageTitle from '../../layouts/PageTitle';
import { IMAGES } from '../../constant/theme';
import {gridDataBlog} from '../staff/GridData';



const AllProfessor = () => {
    const [sort, setSortData] = useState(10);
    const [data, setData] = useState([]);
    const [professors, setProfessers] = useState([]);    
    const activePag = useRef(0);
    const [test, setTest] = useState(0) ;
    const [iconData, setIconData] = useState({ complete: false, ind: -1 });   

    const theadData = [
        { heading: 'Profil', sortingValue: "profile" },
        { heading: 'Nom', sortingValue: "nom" },    
        { heading: 'Région', sortingValue: "region" }, 
        { heading: 'Sexe', sortingValue: "sexe" },   
        { heading: 'Diplôme', sortingValue: "education" },
        { heading: 'Date de nomination', sortingValue: "join" },
        { heading: 'Numéro de téléphone', sortingValue: "mobile" },
        { heading: 'Email', sortingValue: "email" },
        { heading: 'Action', sortingValue: "action" }
    ];
  
        //getAllProfessor
        React.useEffect(() => {
            axios.get(`http://127.0.1.1:5000/getAllEns`)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response)
                setProfessers(response.data);
                console.log("Fetched Professors:", response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
        }, []);

    const chargeData = (first, sec) => {
        for (var i = 0; i < data.length; ++i) {
          if (i >= first && i < sec) {
            data[i].classList.remove('d-none')
          } else {
            data[i].classList.add('d-none')
          }
        }
    }
      
    useEffect(() => {
        setData(document.querySelectorAll('#holidayList tbody tr'))        
    }, [test])
    
      
    activePag.current === 0 && chargeData(0, sort)

    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1)
    
      
    const onClick = (i) => {
        activePag.current = i
        chargeData(activePag.current * sort, (activePag.current + 1) * sort)
        setTest(i)
    }

    function SortingData(nom){
        const sortedProfessors = [...professors]; 
        switch (nom) {
            case "profile":
                sortedProfessors.sort((a, b) => a.profile.localeCompare(b.profile));
                break;
            case "name":
                sortedProfessors.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "region":
                sortedProfessors.sort((a, b) => a.department.localeCompare(b.department));
                break;
            case "sexe":
                sortedProfessors.sort((a, b) => a.sexe.localeCompare(b.sexe));
                break;
            case "education":
                sortedProfessors.sort((a, b) => a.education.localeCompare(b.education));
                break;
            case "join":
                sortedProfessors.sort((a, b) => a.join.localeCompare(b.join));
                break;
            case "mobile":
                sortedProfessors.sort((a, b) => a.mobile.localeCompare(b.mobile));
                break;
            case "email":
                sortedProfessors.sort((a, b) => a.email.localeCompare(b.email));
                break;
            default:
                break;
        }            
        setProfessers(sortedProfessors);         
    }    
    function DataSearch(e){  
        const updatesDate =  professors.filter(item =>{            
            let selectdata = `${item.nom} ${item.department} ${item.sexe} ${item.join} ${item.education} ${item.mobile}`.toLowerCase();                          
            return  selectdata.includes(e.target.value.toLowerCase())
        });        
        setProfessers([...updatesDate])        
    }
    return (
        <>
            <PageTitle activeMenu={"Tous les enseignants"} motherMenu={"Enseignants"}/>
            <Row>
                <Tab.Container defaultActiveKey={"List"}>
                    <div className="col-lg-12">
                        <Nav as="ul" className="nav nav-pills mb-3">
                            <Nav.Item as="li"><Nav.Link eventKey="List" className="me-1">List View</Nav.Link></Nav.Item>
                            <Nav.Item as="li"><Nav.Link eventKey="Grid" >Grid View</Nav.Link></Nav.Item>
                        </Nav>
                    </div>
                    <div className="col-lg-12">
                        <Tab.Content className="row tab-content">
							<Tab.Pane eventKey="List" className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Tous les enseigants </h4>
                                        <Link to={"/add-professor"} className="btn btn-primary">+ Ajouter un nouveau</Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id='holidayList' className='dataTables_wrapper no-footer'>
                                                <div className='justify-content-between d-sm-flex'>                                    
                                                    <div className='dataTables_length'>
                                                        <label className='d-flex align-items-center'>
                                                            Afficher
                                                            <Dropdown className='search-drop'>
                                                                <Dropdown.Toggle as="div" className="search-drop-btn">
                                                                    {sort}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={()=>setSortData('10')}>10</Dropdown.Item>
                                                                    <Dropdown.Item onClick={()=>setSortData('20')}>20</Dropdown.Item>
                                                                    <Dropdown.Item onClick={()=>setSortData('30')}>30</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                            entrées
                                                        </label>
                                                    </div>
                                                    <div className="dataTables_filter">
                                                        <label>Chercher : <input type="search" className="" placeholder="" 
                                                                onChange={DataSearch}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <table id="example4" className="display dataTable no-footer w-100" >
                                                    <thead>
                                                        <tr>                                                
                                                            {theadData.map((item, ind)=>(
                                                                <th key={ind}
                                                                    onClick={()=>{SortingData(item.sortingVale); setIconData(prevState => ({complete:!prevState.complete, ind: ind }) )}}
                                                                >{item.heading}
                                                                    <span>
                                                                        {ind !== iconData.ind &&
                                                                            <i className="fa fa-sort ms-2 fs-12" style={{opacity: '0.3'}} />                                                                
                                                                        }
                                                                        {ind === iconData.ind && (
                                                                            iconData.complete ? 
                                                                                <i className="fa fa-arrow-down ms-2 fs-12"  style={{opacity: '0.7'}} />
                                                                                :
                                                                                <i className="fa fa-arrow-up ms-2 fs-12" style={{opacity: '0.7'}} />                                                                    
                                                                            )                                                            
                                                                        }
                                                                    </span>
                                                                </th>
                                                            ))}                                               
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {professors.map((data, ind)=>(
                                                            <tr key={ind}>
                                                                <td><img className="rounded-circle" width="35" src={data.profile} alt="" /> </td>                                                                                                                       
                                                                <td>{data.nom}</td>                                                    
                                                                <td>{data.region}</td>                                                    
                                                                <td>{data.sexe}</td>                                                    
                                                                <td>{data.diplome}</td>
                                                                <td>{data.nomination}</td>                                                                                                                                                  
                                                                <td><Link to={"#"}><strong>{data.mobile}</strong></Link></td>
                                                                <td><Link to={"#"}><strong>{data.email}</strong></Link></td>
                                                                <td>
                                                                    <Link to={"#"} className="btn btn-xs sharp btn-primary me-1"><i className="fa fa-pencil" /></Link>
                                                                    <Link to={"#"} className="btn btn-xs sharp btn-danger"><i className="fa fa-trash" /></Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
                                                    <div className='dataTables_info'>
                                                    Affichage de {activePag.current * sort + 1} à{' '}
                                                        {data.length > (activePag.current + 1) * sort
                                                            ? (activePag.current + 1) * sort
                                                            : data.length}{' '}
                                                        sur {data.length}  entrées
                                                    </div>
                                                    <div
                                                        className='dataTables_paginate paging_simple_numbers'
                                                        id='example5_paginate'
                                                    >
                                                        <Link
                                                            className='paginate_button previous disabled'
                                                            to='#'
                                                            onClick={() =>
                                                                activePag.current > 0 && onClick(activePag.current - 1)
                                                            }
                                                        >                                                
                                                            Précédent
                                                        </Link>
                                                        <span>
                                                            {paggination.map((number, i) => (
                                                                <Link
                                                                    key={i}
                                                                    to='#'
                                                                    className={`paginate_button  ${
                                                                        activePag.current === i ? 'current' : ''
                                                                    } `}
                                                                    onClick={() => onClick(i)}
                                                                >
                                                                    {number}
                                                                </Link>
                                                            ))}
                                                        </span>
                                                        <Link
                                                            className='paginate_button next'
                                                            to='#'
                                                            onClick={() =>
                                                                activePag.current + 1 < paggination.length &&
                                                                onClick(activePag.current + 1)
                                                            }
                                                        >                                                
                                                            Suivant
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Grid"  className="col-lg-12">
								<div className="row">
                                    {gridDataBlog.map((item, ind)=>(
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={ind}>
                                            <div className="card card-profile">
                                                <div className="card-header justify-content-end pb-0 border-0">
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="button" className="btn btn-link i-false" type="button">
                                                            <span className="dropdown-dots fs--1"></span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="end" className="dropdown-menu dropdown-menu-right border py-0">
                                                            <div className="py-2">
                                                                <Link to={"#"} className="dropdown-item">Modifier</Link>
                                                                <Link to={"#"} className="dropdown-item text-danger">Supprimer</Link>
                                                            </div>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="card-body pt-2">
                                                    <div className="text-center">
                                                        <div className="profile-photo">
                                                            <img src={item.image} width="100" className="img-fluid rounded-circle" alt="" />
                                                        </div>
                                                        <h3 className="mt-4 mb-1">{item.nom}</h3>
                                                        <p className="text-muted">{item.subject}</p>
                                                        <ul className="list-group mb-3 list-group-flush">
                                                            {item.content.map((data, ind)=>(
                                                                <li className="list-group-item px-0 d-flex justify-content-between" key={ind}>
                                                                    <span className="mb-0">{data.title} :</span><strong>{data.subtitle}</strong>
                                                                </li>
                                                            ))}                                                           
                                                        </ul>
                                                        <Link to={"/professor-profile"} className="btn btn-outline-primary btn-rounded mt-3 px-4">Read More</Link>
                                                    </div>
                                                </div>
                                            </div>
									    </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </Row>
        </>
    );
};

export default AllProfessor;