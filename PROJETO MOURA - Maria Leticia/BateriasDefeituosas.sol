// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasDefeituosas {
    address public dono;
    constructor() {
        dono= msg.sender;
    }

    struct Bateria {
        string tipo;
        string uso;
        string nr_serie;
        string dataprod;
        string lote;
        string dataInclusao;
    }

    modifier onlyOwner() {
        require(msg.sender == dono, "Apenas o dono pode remover itens");
        _;
    }

    Bateria[] private bateriasComDefeito;

    mapping(string => bool) private numeroDeSerieExiste;

    function cadastrarBateria(string memory tipo, string memory uso, string memory nr_serie, string memory dataprod, string memory lote, string memory dataInclusao) public onlyOwner{
        require(bytes(nr_serie).length > 0, "Numero de serie obrigatorio");
        require(!numeroDeSerieExiste[nr_serie], "Numero de serie ja cadastrado");
        
        Bateria memory bat=Bateria(tipo, uso, nr_serie, dataprod, lote, dataInclusao);
        bateriasComDefeito.push(bat);
        numeroDeSerieExiste[nr_serie] = true;
    }
    function listarBaterias() public view returns(Bateria[]memory) {
        return bateriasComDefeito;
    }
    function removerBateria(uint256 index) public onlyOwner {
        require(index < bateriasComDefeito.length, "Indice invalido");
        string memory serieRemovida = bateriasComDefeito[index].nr_serie;
        numeroDeSerieExiste[serieRemovida] = false;

        bateriasComDefeito[index] = bateriasComDefeito[bateriasComDefeito.length - 1];
        bateriasComDefeito.pop();
    }
}