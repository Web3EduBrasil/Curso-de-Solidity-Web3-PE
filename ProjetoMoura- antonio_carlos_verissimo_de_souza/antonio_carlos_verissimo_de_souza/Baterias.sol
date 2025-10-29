// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Baterias {
    address public owner;

    // ESTRUTURA REVISADA: Status removido
    struct Battery {
        string batteryType;
        string use; 
        string lote;
        string serialNumber;
        uint256 productionDate;
        // REMOVIDO: string status; 
        bool exists;
    }

    mapping(string => Battery) private batteries;
    string[] private serialNumbers;

    event BatteryCreated(string serialNumber);
    event BatteryUpdated(string serialNumber);
    // REMOVIDO: event BatteryStatusUpdated(string serialNumber, string newStatus);
    event BatteryDeleted(string serialNumber);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode executar esta acao");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // FUNÇÃO INALTERADA (apenas remove a atribuição de status)
    function createBattery(
        string calldata _batteryType,
        string calldata _use, 
        string calldata _lote,
        string calldata _serialNumber,
        uint256 _productionDate
    ) external onlyOwner {
        require(!batteries[_serialNumber].exists, "Numero de serie ja cadastrado");
        require(bytes(_serialNumber).length > 0, "Numero de serie invalido");

        batteries[_serialNumber] = Battery({
            batteryType: _batteryType,
            use: _use, 
            lote: _lote,
            serialNumber: _serialNumber,
            productionDate: _productionDate,
            // REMOVIDO: status: "Em Estoque", 
            exists: true
        });

        serialNumbers.push(_serialNumber);
        emit BatteryCreated(_serialNumber);
    }

    // FUNÇÃO INALTERADA (apenas remove a referência a status)
    function updateBattery(
        string calldata _serialNumber,
        string calldata _batteryType,
        string calldata _use, 
        string calldata _lote,
        uint256 _productionDate
    ) external onlyOwner {
        require(batteries[_serialNumber].exists, "Bateria nao encontrada");

        Battery storage b = batteries[_serialNumber];
        b.batteryType = _batteryType;
        b.use = _use; 
        b.lote = _lote;
        b.productionDate = _productionDate;

        emit BatteryUpdated(_serialNumber);
    }


    
    // deleteBattery - sem alterações
    function deleteBattery(string calldata _serialNumber) external onlyOwner {
        require(batteries[_serialNumber].exists, "Bateria nao encontrada");

        delete batteries[_serialNumber];

        for (uint256 i = 0; i < serialNumbers.length; i++) {
            if (
                keccak256(bytes(serialNumbers[i])) ==
                keccak256(bytes(_serialNumber))
            ) {
                serialNumbers[i] = serialNumbers[serialNumbers.length - 1];
                serialNumbers.pop();
                break;
            }
        }

        emit BatteryDeleted(_serialNumber);
    }
    
    // FUNÇÃO REVISADA: Status removido do retorno
    function getBattery(string calldata _serialNumber)
        external
        view
        returns (
            string memory batteryType,
            string memory use, 
            string memory lote,
            string memory serialNumber,
            uint256 productionDate
            // REMOVIDO: string memory status
        )
    {
        require(batteries[_serialNumber].exists, "Bateria nao encontrada");
        Battery storage b = batteries[_serialNumber];
        return (b.batteryType, b.use, b.lote, b.serialNumber, b.productionDate);
    }

    function listBatteries()
        external
        view
        returns (Battery[] memory) 
    {
        uint256 total = serialNumbers.length;
        Battery[] memory list = new Battery[](total);
        for (uint256 i = 0; i < total; i++) {
            list[i] = batteries[serialNumbers[i]];
        }
        return list;
    }

    function totalBatteries() external view returns (uint256) {
        return serialNumbers.length;
    }
}