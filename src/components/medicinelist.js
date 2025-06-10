import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Alert, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setMedicines, loadFromLocalStorage } from './store/medicineslice';
import Navbar from './navbar';

const ITEMS_PER_PAGE = 2;

const MedicineList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const medicineState = useSelector((state) => state.medicine.medicines);

    const userEmail = user?.email;
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [medicineInput, setMedicineInput] = useState('');
    const [quantityInput, setQuantityInput] = useState('');
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const medicines = medicineState[userEmail] || [];

    useEffect(() => {
        dispatch(loadFromLocalStorage());
    }, [dispatch]);

    if (!user) {
        return <Alert variant="danger">Please log in to manage your medicine list.</Alert>;
    }
    
    const updateMedicines = (updatedList) => {
        dispatch(setMedicines({ email: userEmail, medicines: updatedList }));
    };

    const openModal = (index = null) => {
        setEditIndex(index);
        setMedicineInput(index !== null ? medicines[index].name : '');
        setQuantityInput(index !== null ? medicines[index].quantity : '');
        setShowModal(true);
        setMessage('');
    };

    const saveMedicine = () => {
        if (!medicineInput.trim() && !quantityInput) {
            alert('Medicine name and quantity is required.');
            return;
        }

        const today = new Date().toDateString();
        const todayEntries = medicines.filter((m) => m.date === today);
        if (editIndex === null && todayEntries.length >= 5) {
            setMessage('You can only add up to 5 medicines per day.');
            return;
        }

        const newEntry = {
            name: medicineInput.trim(),
            quantity: quantityInput,
            date: today,
        };

        const updated = editIndex !== null
            ? medicines.map((m, i) => (i === editIndex ? newEntry : m))
            : [...medicines, newEntry];

        updateMedicines(updated);
        setShowModal(false);
        setEditIndex(null);
        setMedicineInput('');
        setQuantityInput('');
    };

    const deleteMedicine = (index) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            const updated = medicines.filter((_, i) => i !== index);
            updateMedicines(updated);
        }
    };

    

    const filteredMedicines = medicines.filter((entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedMedicines = filteredMedicines.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return (
        <div>
            <Navbar />



            <div className="container mt-5">
                <h3 className="mb-4">Medicine List</h3>

                {message && <Alert variant="danger">{message}</Alert>}

                <div className="row mb-3">
                    <div className="col">
                        <Button variant="primary" onClick={() => openModal()}>
                            Add Medicine
                        </Button>
                    </div>
                    <div className="col">
                        <Form.Control
                            type="text"
                            placeholder="Search medicine"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                <Table striped bordered>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Added On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedMedicines.map((entry, index) => (
                            <tr key={startIdx + index}>
                                <td>{startIdx + index + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.quantity}</td>
                                <td>{entry.date}</td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => openModal(startIdx + index)}>Edit</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteMedicine(startIdx + index)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="d-flex justify-content-center">
                    {totalPages > 1 && (
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages)].map((_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={currentPage === idx + 1}
                                    onClick={() => setCurrentPage(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    )}
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{editIndex !== null ? 'Edit' : 'Add'} Medicine</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="medicineInput">
                                <Form.Label>Medicine Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={medicineInput}
                                    onChange={(e) => setMedicineInput(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="quantityInput" className="mt-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantityInput}
                                    min={1}
                                    onChange={(e) => setQuantityInput(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={saveMedicine}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default MedicineList;
