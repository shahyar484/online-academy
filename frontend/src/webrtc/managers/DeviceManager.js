class DeviceManager {

    async getDevices() {

        const devices =
            await navigator.mediaDevices.enumerateDevices();

        return {

            cameras:

                devices.filter(

                    d => d.kind === 'videoinput'

                ),

            microphones:

                devices.filter(

                    d => d.kind === 'audioinput'

                ),

            speakers:

                devices.filter(

                    d => d.kind === 'audiooutput'

                )

        };

    }

    async changeCamera(deviceId) {

        return await navigator.mediaDevices.getUserMedia({

            video: {

                deviceId: {

                    exact: deviceId

                }

            },

            audio: true

        });

    }

    async changeMicrophone(deviceId) {

        return await navigator.mediaDevices.getUserMedia({

            video: true,

            audio: {

                deviceId: {

                    exact: deviceId

                }

            }

        });

    }

}

export default DeviceManager;