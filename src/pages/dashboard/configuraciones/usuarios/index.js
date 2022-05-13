import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
// components
import PageTitle from '../../../../components/PageTitle';
import Grid from './Grid';
import { INIT_CAMPOS, INIT_VALUES, patrones } from './constants';
import { any } from 'prop-types';

/* status column render */

const Usuarios = (): React$Element<React$FragmentType> => {
    const [values, setValues] = useState(INIT_VALUES);
    const [alert, setAlerts] = useState([]);
    const [signUpModal, setSignUpModal] = useState(false);
    const [btndisabled, setBtnGuardar] = useState(false);
    /*
     * validar  Campo
     */

    const onValideCampo = (e, value, campo, key, typecampo, maxcaract, type) => {
        let nombre = type === 'select' ? e.value : e.target.value;
        const num = type === 'select' ? Number.parseInt(nombre) : Number.parseInt(nombre.length);

        const patron = patrones(typecampo);
        if (num <= maxcaract) {
            if (!patron.exec(nombre) < 1) {
                const alerts = {
                    textcolor: 'success',
                    validated: true,
                    mensalert: 'null',
                    now: 25,
                    disabled: false,
                    key: key,
                };

                //1.GUARDAMOS EN NOMBRE DEL CAMPO Y  SU VALOR
                //EN ARRAY DIFERENTES
                var gcam = [];
                var gnom = [];
                gcam.push(`${campo}`);
                gnom.push(`${nombre}`);

                //2.UNIMOS LOS DOS ARRAY
                const values = gcam.concat(gnom);

                //3. CONDICIONAMOS QUE SEA LA PRIMERA VEZ
                //CADA VEZ QUE EL ARRAY SEA DE 2 ELEMENTOS
                if (values.length === 2) {
                    const arr = JSON.parse(JSON.stringify(values));
                    //4. ARMAMOS EL OBJETO ACTUAL CON SU NOMBRE:VALOR
                    var valores = arr.reduce(function (acc, cur, i) {
                        if (i === 0) {
                            acc[cur] = nombre;
                        }
                        return acc;
                    }, {});
                    //4. ASIGNAMOS LOS DOS OBJETOS PARA
                    //CREAR EL PRINCIPAL
                    const form = Object.assign(value.form[0], valores);
                    setValues({ form, alerts: [alerts] });
                }
            } else {
                const alerts = [
                    {
                        textcolor: 'danger',
                        validated: false,
                        mensalert: 'El Campo ' + campo + ' tiene un cáracter no validado',
                        now: 25,
                        disabled: true,
                        key: key,
                    },
                ];
                setValues({ alerts });
            }
        } else {
            const alerts = [
                {
                    textcolor: 'danger',
                    validated: false,
                    mensalert:
                        'El Campo ' + campo + ' excede el máximo de caracteres requerido:  hasta' + maxcaract + ' ',
                    now: 25,
                    disabled: true,
                    key: key,
                },
            ];
            setValues({ alerts });
        }
    };

    useEffect(() => {
        if (values.alerts && values.alerts.length > 0) {
            setAlerts(values.alerts[0]);
        }
    }, [values]);
    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
        setBtnGuardar(false);
    };
    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setValues([]);
        setBtnGuardar(!btndisabled);
    };
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/dashboard/Dashboard' },
                    { label: 'Usuarios', path: '/dashboard/configuraciones/usuarios', active: true },
                ]}
                title={'Configuración de usuarios'}
            />
            <Row>
                <Col lg={12}>
                    <Grid
                        campos={INIT_CAMPOS}
                        onValideCampo={onValideCampo}
                        signUpModal={signUpModal}
                        btndisabled={btndisabled}
                        values={values}
                        alerts={alert}
                        toggleSignUp={toggleSignUp}
                        Close={Close}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Usuarios;
