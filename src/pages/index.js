import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ItemRow from '../components/ItemRow'
import { getLocalDateAndTime } from '../utils/date';
import indexStyle from './index.module.css';
import { FiArrowUpCircle } from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { GiCardboardBox } from "react-icons/gi";

// markup
const IndexPage = () => {
  const dbResult = useStaticQuery(graphql`
  query {
    allBoxJson {
      edges {
        node {
          name
          _id
        }
      }
    }
    allFile(filter: {dir: {}, sourceInstanceName: {eq: "item"}}) {
      edges {
        node {
          name
          relativeDirectory
          internal {
            content
          }
        }
      }
    }    
  }  
`);

  const boxHash = dbResult.allBoxJson.edges.reduce((result, current) => {
    const box = current.node;
    box.items = [];
    const _id = box._id.replace(/^box\//,'');
    box._id = _id;
    result[_id] = box;
    return result;
  }, {});

  const itemHash = dbResult.allFile.edges.reduce((result, current) => {
    const item = JSON.parse(current.node.internal.content);
    const _id = (item._id.split('/'))[2];
    item._id = _id;
    result[_id] = item;
    const boxId = current.node.relativeDirectory;
    if (boxHash[boxId]) {
      boxHash[boxId].items.push(_id);
    }
    return result;
  }, {});
  
  const sortedItem = Object.values(itemHash).sort((a, b) => {
    if(a.created_date < b.created_date) return 1;
    if(a.created_date > b.created_date) return -1
    return 0;
  });
  const lastModifiedDate = sortedItem[0].modified_date;

  const orderedBoxes = Object.values(boxHash).sort((a, b) => {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1
    return 0;
  });
  return (
    <main>
      <title>疏水箱</title>
      <div id='top' className={indexStyle.sosuibako}>
        <div className={indexStyle.lastModifiedDate}>最終更新：{getLocalDateAndTime(lastModifiedDate)}</div>
        <div className={indexStyle.title}>
          疏水箱
        </div>
        <div className={indexStyle.description}>
          どの箱になにが入ってるかの記録です。
        </div>
        {orderedBoxes.map(box => (
          <a style={{textDecoration: 'none'}} href={`#${box._id}`}>
            <div className={indexStyle.boxIndex}>{box.name}</div>
          </a>
          ))
        }
        <br style={{clear: 'both'}} />
        {orderedBoxes.map(box => (
          <div className={indexStyle.boxContents} key={box._id}>
            <div id={box._id} className={indexStyle.boxRow}>
            <a href={`#${box._id}`}>
              <div className={indexStyle.boxLink}>
                <div className={indexStyle.boxIcon}><GiCardboardBox /></div>
                <div className={indexStyle.boxName}>{box.name}</div>
              </div>
            </a>
            <a href={`#top`}><div className={indexStyle.gototop}><FiArrowUpCircle style={{fontSize: '20px'}}/></div></a></div>
            {
              box.items.map((itemId, index) => (<ItemRow key={itemId} item={itemHash[itemId]} index={index}></ItemRow>))
            }
          </div>))
        }
        <hr style={{width: '980px', marginLeft: '0px', marginTop: '24px', border: 'none', height: '2px', backgroundColor: '#c08070'}}/>        
        <div className={indexStyle.footnote}>
          <div style={{float: 'left', marginRight:  '7px'}}><FcAbout style={{fontSize: '24px'}}/></div>
          <div style={{marginTop: '4px', float: 'left'}}>Powered by <a href='https://gitddb.com/'>GitDocumentDB</a></div>
          <div style={{clear: 'both'}}>
          - Data source: <a href='https://github.com/sosuisen/sosuisen-mybox'>https://github.com/sosuisen/sosuisen-mybox</a><br />
          - Site generator: <a href='https://github.com/sosuisen/sosuisen-mybox-gatsby'>https://github.com/sosuisen/sosuisen-mybox-gatsby</a><br />
          - App: <a href='https://github.com/sosuisen/inventory-manager'>https://github.com/sosuisen/inventory-manager</a><br />
          </div>
        </div>        
      </div>
    </main>
  )
}

export default IndexPage
