//SPDX-License_identifier: MIT
pragma solidity ^0.8.0;
contract BateriasMoura{
    //Detalhes bateria
    struct Bateria {
        string tipo;
        string uso;
        string nrSerie;
        string dataProd;
        string lote;
    }

    //armazenar baterias
    Bateria[] private baterias;

    //cadastrar baterias
    function cadastrarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _nrSerie,
        string memory _dataProd,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria(_tipo, _uso, _nrSerie, _dataProd, _lote);
        baterias.push(novaBateria);
    }

    //obter baterias pelo indice
    function getBateria(uint256 index) public view returns (
        string memory tipo,
        string memory uso,
        string memory nrSerie,
        string memory dataProd,
        string memory lote
    ) {
        require(index < baterias.length, "Indice fora do limite");
        Bateria memory b = baterias[index];
        return (b.tipo, b.uso, b.nrSerie, b.dataProd, b.lote);
    }

    //listar as baterias
    function listar() public view returns (Bateria[] memory) {
        return  baterias;
    }
    
}