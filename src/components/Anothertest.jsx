import { Canvas} from '@react-three/fiber';
import { Dodecahedron, OrbitControls } from '@react-three/drei';
import { MeshStandardMaterial, PointLight } from 'three';
import { Html } from '@react-three/drei';

const onSubmit = async (event) => {
    console.log(event); 
    
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "57bf412d-c318-409e-90f7-9f444d13213e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }

    //const name = document.getElementById("name")
    //console.log(name); 
    
  };

const Anothertest = () => {
    return (
        <Canvas shadows camera={{position: [0, 0, 0]}} style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #ffffff, hsl(210, 60%, 40%))' }}>
            <OrbitControls/>
            
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            
            <Dodecahedron args={[30, 0]} position={[50, 0, -50]} material={new MeshStandardMaterial({ color: 'blue', metalness: 0.5 })} />
            
            <Html
            style={{
                position: 'absolute',
                top: 400,
                left: 350,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
            }}
            >
            <style>
                {`
                    .input-field {
                        border: 3px solid;
                        border-image-slice: 1;
                        border-width: 2px;
                        border-image-source: linear-gradient(to right, black, blue900);
                        padding: 10px;
                        width: 100%;
                        border-radius: 5px;
                    }
                    .text-field {
                        border: 3px solid;
                        border-image-slice: 1;
                        border-width: 2px;
                        border-image-source: linear-gradient(to right, black, blue900);
                        padding: 10px;
                        width: 100%;
                        height: 200px;
                        border-radius: 5px;
                    }
                `}
        </style>
        <div >
          <form onSubmit={onSubmit}>
          <div className="w-full h-1/2 p-[5px] rounded-[20px] bg-gradient-to-r from-black to-blue-900" style={{ minHeight: '80vh', minWidth: '75vh'}}>
                <div className="bg-gray-100 rounded-[20px] py-5 px-20 flex justify-evenly items-center flex-col" style={{ minHeight: '80vh' }}
                >
                    <h3 className="text-blue-900 text-xl font-bold">Email</h3>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="text" name="name" placeholder="Name"/>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="email" name="email" placeholder="Email"/>
                    <textarea className="bg-gray-100 text-blue-900 mt-4 text-field"  name="message" placeholder="Message"></textarea>
                    <button onClick="name.value = '' && input.value = '' && textarea.value = ''" className="bg-gradient-to-r from-black to-blue-900 text-white rounded-full px-5 py-2 text-sm font-bold mx-2 my-4" type="submit">Submit Email</button>
                </div>
                </div>
          </form>
          </div>
            </Html>
        </Canvas>
    )
}

export default Anothertest; 