import {useState} from 'react'
import {AiFillYoutube, AiOutlineSearch} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
export default function SearchBar() {
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState<string>('');
    return (
        <div style={{
            display:'flex',
            alignItems:'center',
            marginTop:'10px'
        }}>
            <section 
            style={{display:'flex',alignItems:'center', flex:1, justifyContent:'center', cursor:'pointer'}}
            onClick={(e)=>{
                e.preventDefault();
                navigate('/');
            }}
            >
                <AiFillYoutube style={{width:'50px', height:'50px', color:'red'}}/>
                <h2 style={{color:'white'}}>Youtube</h2>
            </section>
            <form 
            style={{flex:9, display:'flex', justifyContent:'flex-end', alignItems:'center'}}
            onSubmit={(e)=>{
                e.preventDefault();
                navigate(`/${searchWord}`);
                setSearchWord('');
            }}
            >
                <input type='textarea' 
                style={{
                    flex:'1 1 auto', minWidth:'200px',maxWidth:'700px', height:'40px', 
                    color:'white',border:'1px solid #717171', borderRadius: '40px 0 0 40px', 
                    paddingLeft:'15px',fontSize:'15px', marginLeft:'100px'
                }}
                onChange={(e)=>{
                    setSearchWord(e.target.value);
                }}
                value={searchWord}
                />
                <button style={{width:'64px', height:'40px', color:'white', fontSize: 24, border:'1px solid #717171', borderRadius: '0 40px 40px 0', borderLeft:'none'}}>
                    <AiOutlineSearch/>
                </button>
            </form>
        </div>
    )
}
