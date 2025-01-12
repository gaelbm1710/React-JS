import React, { useState } from 'react'
import "./OpeItem.scss";
import { Button, Icon, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { OpeForm, OpeView } from "../OpeForm"
import { OpessView } from '../OpessForm/Opessview';

export function OpeItem(props) {
  const { mag, onReload } = props
  const [showModal, setShowModal] = useState(false);
  const [showshowModal, setshowshowModal] = useState(false)

  const [titleModal, setTitleModal] = useState("");
  const date = new Date(mag.created_at);
  const createdate = date.toLocaleDateString();
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseShowModal = () => setshowshowModal((prevState) => !prevState);

  const openUpdateMag = () => {
    setTitleModal(`Revisar cotización: ${mag.folio}`)
    onOpenCloseModal();
  }
  const openVerMag = () => {
    setTitleModal(`Cotizacion: ${mag.folio}`)
    onOpenCloseShowModal();
  }


  const getStatusColor = (status) => {
    switch (status) {
      case 'Finalizado':
        return 'green';
      case 'Pendiente':
        return 'orange';
      case 'Cancelado':
        return 'red';
      default:
        return 'green';
    }
  };

  let getStatusGeneralColor;
  if (mag.StatusGeneral === 'Pendiente') {
    getStatusGeneralColor = 'orange';
  } else if (mag.StatusGeneral === 'Cancelado') {
    getStatusGeneralColor = 'red';
  } else if (mag.StatusGeneral === 'Finalizado') {
    getStatusGeneralColor = 'green';
  }

  let sIyD = mag.sIyD, sOp = mag.sOp, sCom = mag.sCom;

  if (mag.StatusGeneral !== 'Cancelado') {
    sIyD = mag.sIyD ? 'Finalizado' : 'Pendiente';
    sOp = mag.sOp ? 'Finalizado' : 'Pendiente';
    sCom = mag.sCom ? 'Finalizado' : 'Pendiente';
  } else {
    sIyD = 'Cancelado';
    sOp = 'Cancelado';
    sCom = 'Cancelado';
  }

  let estatusviews;
  if (mag.actividad === 'nueva' || mag.actividad === 'cambio') {
    estatusviews =
      <><p className='cotizacion-item__info'>
        <label className='estatus_gn'>Estatus General: <Label className={`cotizacion-item__info-statusinde`} color={getStatusGeneralColor}>{mag.StatusGeneral}</Label></label>
        <label className='estatus_Id'>Estatus de Inv. y Desarollo: <Label className={`cotizacion-item__info-statusinde ${getStatusColor(sIyD)}`}>{sIyD}</Label></label>
        <label className='estatus_Ope'>Estatus de Operaciones: <Label className={`cotizacion-item__info-statusope ${getStatusColor(sOp)}`}>{sOp}</Label></label>
        <label className='estatus_GC'>Estatus de Gestión Comercial: <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(sCom)}`}>{sCom}</Label></label>
      </p>
      </>
  } else if (mag.actividad === 'presentacion') {
    estatusviews =
      <>
        <label className='estatus_gn'>Estatus General: <Label className={`cotizacion-item__info-statusinde`} color={getStatusGeneralColor}>{mag.StatusGeneral}</Label></label>
        <label className='estatus_Id'>Estatus de Inv. y Desarollo: <Label className={`cotizacion-item__info-statusinde ${getStatusColor(sIyD)}`}>{sIyD}</Label></label>
        <label className='estatus_GC'>Estatus de Gestión Comercial: <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(sCom)}`}>{sCom}</Label></label>

      </>
  }

  let botonesviews;
  if (mag.StatusGeneral === 'Pendiente' && mag.sOp === false) {
    botonesviews = <><Button icon primary onClick={openUpdateMag}><Icon name='edit' /></Button></>
  } else {
    botonesviews = <><Button icon primary onClick={openVerMag}><Icon name='eye' /></Button></>
  }

  let vistaRapida;
  if (mag.actividad === 'nueva') {
    vistaRapida = <>   <p className='cotizacion-item__info'> <span className='cotizacion-item__info-label'>Base:</span>
      <span className='cotizacion-item__info-valor'>{mag.base}</span><br />
      <span className='cotizacion-item__info-label'>Activos:</span>
      <span className='cotizacion-item__info-valor'>{mag.activos}</span> </p></>
  } else if (mag.actividad === 'presentacion') {
    vistaRapida = <> <p className='cotizacion-item__info'><span className='cotizacion-item__info-label'>Clave Existente:</span>
      <span className='cotizacion-item__info-valor'>{mag.clave_ex}</span><br /> </p></>
  } else if (mag.actividad === 'cambio') {
    vistaRapida = <>   <p className='cotizacion-item__info'> <span className='cotizacion-item__info-label'>Clase Existente:</span>
      <span className='cotizacion-item__info-valor'>{mag.clave_ex}</span><br />
      <span className='cotizacion-item__info-label'>Base de Cambio:</span>
      <span className='cotizacion-item__info-valor'>{mag.base}</span></p></>
  }

  let contentView;
  if (mag.actividad === 'nueva') {
    contentView = <OpeView onClose={onOpenCloseShowModal} onReload={onReload} mag={mag} />
  } else if (mag.actividad === 'cambio') {
    contentView = <OpessView onClose={onOpenCloseShowModal} onReload={onReload} mag={mag} />
  } else {
    contentView = <div>Error en sistema</div>
  }


  return (
    <>
      <div className='cotizacion-item'>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Folio:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio}</span><br />
            <span className='cotizacion-item__info-label'>Folio Operaciones:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio_Op}</span><br />
            <span className='cotizacion-item__info-label'>Folio Gestión Comercial:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio_sCom}</span><br />
            <span className='cotizacion-item__info-label'>Creado:</span>
            <span className='cotizacion-item__info-valor'>{createdate}</span>
          </p>
        </div>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Asesor:</span>
            <span className='cotizacion-item__info-valor'>{mag.asesor}</span>
            <span className='cotizacion-item__info-valor'>{mag.asesornom}</span><br />
            <span className='cotizacion-item__info-label'>Medico:</span>
            <span className='cotizacion-item__info-valor'>{mag.cardcode}</span>
            <span className='cotizacion-item__info-valor'>{mag.cliente}</span>
          </p>
        </div>
        <div className='column'>
          {vistaRapida}
        </div>
        <div className='column'>
          {estatusviews}
        </div>
        <div className='button-container'>
          {botonesviews}
        </div>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <OpeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />
      </BasicModal>
      <BasicModal show={showshowModal} close={onOpenCloseShowModal} title={titleModal}>
        {contentView}
      </BasicModal>
    </>
  )
}
