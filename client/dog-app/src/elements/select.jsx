

function Select({source, onSelectChange}) {
   

    const handleSelectChange = (e) => {
        const value = parseInt(e.target.value, 10);
        onSelectChange(value);
    };

return (
    <div className='filter-containerF'>
    <p className='filter-label'>Filtrar por:</p>
    <select onChange={handleSelectChange} value={source}>
        <option value={0}>Datos Locales</option>
        <option value={1}>API</option>
    </select>
</div>
)
}

export default Select