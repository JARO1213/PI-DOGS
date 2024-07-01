import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDog, editDog } from '../features/counter/dogsSlice.js';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

function DogForm() {
    const [dogCreate, setDogCreate] = useState({
        name: "",
        image: "",
        weightMetricMin: "",
        weightMetricMax: "",
        weightImperialMin: "",
        weightImperialMax: "",
        heightMetricMin: "",
        heightMetricMax: "",
        heightImperialMin: "",
        heightImperialMax: "",
        life_span: "",
        temperament: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const dogsState = useSelector(state => state.dogState.dogs);

    useEffect(() => {
        if (params.id) {
            const paramIdAsNumber = Number(params.id);
            const dogToEdit = dogsState.find((dog) => dog.id === paramIdAsNumber);
            if (dogToEdit) {
                // Desestructurar datos del perro a editar
                console.log('esto es el contenido',dogToEdit)
                const { weightMetric, weightImperial, heightMetric, heightImperial, ...rest } = dogToEdit;
                setDogCreate({
                    ...rest,
                    weightMetricMin: weightMetric?.split('-')[0].trim() || "",
                    weightMetricMax: weightMetric?.split('-')[1].trim() || "",
                    weightImperialMin: weightImperial?.split('-')[0].trim() || "",
                    weightImperialMax: weightImperial?.split('-')[1].trim() || "",
                    heightMetricMin: heightMetric?.split('-')[0].trim() || "",
                    heightMetricMax: heightMetric?.split('-')[1].trim() || "",
                    heightImperialMin: heightImperial?.split('-')[0].trim() || "",
                    heightImperialMax: heightImperial?.split('-')[1].trim() || ""
                });
            }
        }
    }, [params, dogsState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const trimmedValue = value.trim();

        if (name === 'name' || name === 'temperament') {
            // Verificar que el valor no contenga números
            const regex = /^[a-zA-Z\s]*$/;
            if (!regex.test(trimmedValue)) {
                alert("No se permiten números en este campo.");
                return;
            }
        }
        
        setDogCreate({
            ...dogCreate,
            [name]: trimmedValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos requeridos estén llenos antes de enviar el formulario
        if (!dogCreate.name || !dogCreate.life_span) {
            alert("Por favor completa todos los campos requeridos.");
            return;
        }
        const weightMetricMin = parseFloat(dogCreate.weightMetricMin);
        const weightMetricMax = parseFloat(dogCreate.weightMetricMax);
        const weightImperialMin = parseFloat(dogCreate.weightImperialMin);
        const weightImperialMax = parseFloat(dogCreate.weightImperialMax);
        const heightMetricMin = parseFloat(dogCreate.heightMetricMin);
        const heightMetricMax = parseFloat(dogCreate.heightMetricMax);
        const heightImperialMin = parseFloat(dogCreate.heightImperialMin);
        const heightImperialMax = parseFloat(dogCreate.heightImperialMax);

        if (
            isNaN(weightMetricMin) || isNaN(weightMetricMax) ||
            isNaN(weightImperialMin) || isNaN(weightImperialMax) ||
            isNaN(heightMetricMin) || isNaN(heightMetricMax) ||
            isNaN(heightImperialMin) || isNaN(heightImperialMax) ||
            weightMetricMin < 2 || weightMetricMin > 200 ||
            weightMetricMax < 2 || weightMetricMax > 200 ||
            weightImperialMin < 2 || weightImperialMin > 200 ||
            weightImperialMax < 2 || weightImperialMax > 200 ||
            heightMetricMin < 2 || heightMetricMin > 200 ||
            heightMetricMax < 2 || heightMetricMax > 200 ||
            heightImperialMin < 2 || heightImperialMin > 200 ||
            heightImperialMax < 2 || heightImperialMax > 200
        ) {
            alert("Por favor ingresa valores numéricos válidos dentro del rango 2-200.");
            return;
        }
        let newId = params.id || uuid();
        if (params.id) {
            dispatch(editDog({ ...dogCreate, id: params.id }));
        } else {
            dispatch(addDog({ ...dogCreate, id: newId }));
        }

        let link = `/detailedDog/${newId}`;
        navigate(link);
    };

    return (
        <div className='form-container'>
            <div className='form-header'>
                <h2> {params.id ? 'Edita tu perro' : 'Agrega un perro nuevo'} </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div><img src={dogCreate.image} className='dog-image' alt={dogCreate.image} /></div>
                <div className='form-group'>
                    <label>Nombre: </label><input name='name' type="text" placeholder='Nombre' onChange={handleChange} value={dogCreate.name} />
                </div>
                <div className='form-group'>
                    <label>Peso Métrico (kg):</label>
                    <input name='weightMetricMin' type="number" placeholder="Mínimo" onChange={handleChange} value={dogCreate.weightMetricMin} />
                    <input name='weightMetricMax' type="number" placeholder="Máximo" onChange={handleChange} value={dogCreate.weightMetricMax} />
                </div>
                <div className='form-group'>
                    <label>Peso Imperial (lbs):</label>
                    <input name='weightImperialMin' type="number" placeholder="Mínimo" onChange={handleChange} value={dogCreate.weightImperialMin} />
                    <input name='weightImperialMax' type="number" placeholder="Máximo" onChange={handleChange} value={dogCreate.weightImperialMax} />
                </div>
                <div className='form-group'>
                    <label>Altura Métrica (cm):</label>
                    <input name='heightMetricMin' type="number" placeholder="Mínimo" onChange={handleChange} value={dogCreate.heightMetricMin} />
                    <input name='heightMetricMax' type="number" placeholder="Máximo" onChange={handleChange} value={dogCreate.heightMetricMax} />
                </div>
                <div className='form-group'>
                    <label>Altura Imperial (in):</label>
                    <input name='heightImperialMin' type="number" placeholder="Mínimo" onChange={handleChange} value={dogCreate.heightImperialMin} />
                    <input name='heightImperialMax' type="number" placeholder="Máximo" onChange={handleChange} value={dogCreate.heightImperialMax} />
                </div>
                <div className='form-group'>
                    <label>Tiempo de vida: </label><input name='life_span' type="text" placeholder="Tiempo de vida" onChange={handleChange} value={dogCreate.life_span} />
                </div>
                <div className='form-group'>
                    <label>Temperamento:</label><input name='temperament' type="text" placeholder="Temperamento" onChange={handleChange} value={dogCreate.temperament} />
                </div>
                <button className='form-actions'>Guardar</button>
            </form>
        </div>
    );
}

export default DogForm;