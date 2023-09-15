import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next'
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
// import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit' <-- for showing suggestions
import paginationFactory from 'react-bootstrap-table2-paginator'

type Props = {
  columns: ColumnDescription<any, any>[]
  data: any[]
  keyField: string
}
const {SearchBar} = Search

const GlobalTable: React.FC<Props> = ({columns, data, keyField}) => {
  return (
    <ToolkitProvider keyField={keyField} data={data} columns={columns} search>
      {(props) => (
        <div>
          <div className='col-lg-3 mb-5'>
            <SearchBar {...props.searchProps} delay={500} />
          </div>

          <BootstrapTable
            classes='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'
            headerClasses=' text-muted fs-6'
            wrapperClasses={undefined}
            rowClasses='text-dark fw-bolder fs-6'
            bootstrap4={false}
            hover
            {...props.baseProps}
            pagination={paginationFactory({
              hidePageListOnlyOnePage: true,
            })}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

export {GlobalTable}
