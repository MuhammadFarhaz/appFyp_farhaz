import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import ComnBtn from '../components/ComnBtn';
import { Checkbox } from 'react-native-paper';

const Filters = () => {
    const [checked, setChecked] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>




            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ marginLeft: "10%", marginTop: "10%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>Categories</Text>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                    color='#53B175'
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: "#53B175" }}>Eggs</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                    color='#53B175'
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: "#53B175" }}>Noodles & Pasta</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                    color='#53B175'
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: "#53B175" }}>Eggs</Text>
                            </View>
                            

                        </View>

                        <View style={{ marginLeft: "10%", marginTop: "10%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>Brand</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                    color='#53B175'
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: "#53B175" }}>Eggs</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                    color='#53B175'
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: "#53B175" }}>Noodles & Pasta</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                    color='#53B175'
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: "#53B175" }}>Eggs</Text>
                            </View>
                        </View>


                    </View>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <View style={{ marginBottom: "5%" }}>


                        <ComnBtn title="Apply Filter" />


                    </View>
                </TouchableOpacity>
            </Modal>
            <Pressable

                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,



    },
    modalView: {

        backgroundColor: '#DDDDDD',
        borderRadius: 30,
        marginTop: "25%",
        height: "100%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default Filters;