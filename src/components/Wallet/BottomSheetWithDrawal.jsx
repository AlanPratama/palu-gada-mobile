import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import AuthApi from '../../apis/AuthApi';
import PayoutApi from '../../apis/PayoutApi';
import { SelectList } from 'react-native-dropdown-select-list';

export default function BottomSheetWithDrawal({ refRBSheet }) {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "gray",
            width: 100,
            height: 5,
            borderRadius: 5,
            marginVertical: 10,
          },
          container: {
            height: "62%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        openDuration={250}
      >
        <WithDrawalComp refRBSheet={refRBSheet} />
      </RBSheet>
    </View>
  )
}

const listTransferMedia = [
  {
    key: 'BANK_TRANSFER',
    value: 'Transfer Bank'
  },
  {
    key: 'GOPAY',
    value: 'Gopay'
  },
  {
    key: 'DANA',
    value: 'Dana'
  }
]

const WithDrawalComp = ({ refRBSheet }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payoutType, setPayoutType] = useState('')
  const { user } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = async (data) => {
    setIsSubmitted(true)
    const res = await PayoutApi.createPayout({
      ...data,
      payoutType
    })
    if (res) {
      alert('Penarikan saldo berhasil di buat!\nTranfer akan segera kami proses')
      reset()
      await AuthApi.getAuthenticated();
      refRBSheet.current.close()
    }
    setIsSubmitted(false)
  }

  return (
    <ScrollView
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={{ paddingVertical: 20 }}>

        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Jumlah Penarikan
          </Text>
          <Controller
            control={control}
            name="amount"
            rules={{
              required: "Jumlah Penarikan wajib diisi!",
              validate: (value) => value >= 30000 && value <= user.balance || `Harga penawaran minimal 30.000 dan maksimal ${user.balance?.toLocaleString("id-ID") ?? 0}`
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  padding: 10,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
                placeholder="100.000"
                keyboardType="numeric"
              />
            )}
          />
          {errors.amount && <Text style={{ color: "red" }}>{errors.amount.message}</Text>}
        </View>

        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Media / Transfer Tujuan
          </Text>
          <SelectList
            maxHeight={500}
            setSelected={(key) => setPayoutType(key)}
            data={listTransferMedia}
            save="key"
            label="Transfer Type"
            placeholder="Transfer dengan / ke..."
            searchPlaceholder="Cari..."
          />
        </View>

        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Nomor Tujuan (No Rekening / No Regristrasi)
          </Text>
          <Controller
            control={control}
            name="destinationNumber"
            rules={{ required: "Jumlah Penarikan wajib diisi!" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  padding: 10,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
                placeholder="08297123...."
                keyboardType="numeric"
              />
            )}
          />
          {errors.destinationNumber && <Text style={{ color: "red" }}>{errors.destinationNumber.message}</Text>}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 8,
            paddingHorizontal: 18,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitted}
            style={{
              backgroundColor: isSubmitted ? "#d1d1d1" : "#3b82f6",
              flex: 1,
              paddingVertical: 14,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Tarik Saldo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};